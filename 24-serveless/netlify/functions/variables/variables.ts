import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

  console.log('Hello world from "/variable/function"');

  if (!myImportantVariable) {
    return new Response(
      JSON.stringify({ error: "Missing MY_IMPORTANT_VARIABLE" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }

  return new Response(JSON.stringify({ myImportantVariable }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};
