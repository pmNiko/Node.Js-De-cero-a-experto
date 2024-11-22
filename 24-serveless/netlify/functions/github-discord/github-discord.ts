import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";

const notify = async (message: string) => {
  const body = {
    content: message,
  };

  const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? "", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (resp.ok) {
    console.log("Error sending message to  Discord");
    return false;
  }

  return true;
};

const onStar = (payload: any): string => {
  const { action, sender, repository, starred_at } = payload;

  return `User ${sender?.login} ${action} star on ${repository?.full_name}`;
};

const onIssue = (payload: any): string => {
  const { action, issue } = payload;

  if (action === "opened") {
    const message = `An issue was opened with this title "${issue.title}"`;
    return message;
  }

  if (action === "closed") {
    const message = `An issue was closed with this title "${issue.user.login}"`;
    return message;
  }

  if (action === "reopened") {
    const message = `An issue was reopened by "${issue.user.login}"`;
    return message;
  }

  return `Unhandled action for the issue event "${action}"`;
};

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const githubEvent = event.headers["x-github-event"] ?? "unknown";
  const payload = JSON.parse(event.body ?? "{}");
  let message: string;

  console.log(`Payload exists: ${JSON.stringify(payload).length > 2}`);

  switch (githubEvent) {
    case "star":
      message = onStar(payload);
      break;

    case "issues":
      message = onIssue(payload);
      break;

    default:
      message = `Unknown event ${githubEvent}`;
  }

  await notify(message);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
