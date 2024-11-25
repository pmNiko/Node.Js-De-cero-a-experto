const currentTicketLabel = document.querySelector("#lbl-new-ticket");
const createTicketBtn = document.querySelector("button");

const baseUrl = "http://localhost:3000/api/ticket";

async function getLastTicket() {
  try {
    const resp = await fetch(baseUrl + "/last");

    if (!resp.ok) {
      console.log("Error on fetching");
    }

    const numberOfTickets = await resp.json();

    return numberOfTickets;
  } catch (error) {
    console.log(error);
  }
}

async function loadLastTicket() {
  const numberOfTickets = await getLastTicket();

  currentTicketLabel.innerHTML = `Tickets ${numberOfTickets}`;
}

async function createTicket() {
  try {
    const resp = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      console.log("Error on create new ticket");
    }

    const newTicket = await resp.json();

    currentTicketLabel.innerHTML = `Tickets ${newTicket.number}`;
  } catch (error) {
    console.log(error);
  }
}

createTicketBtn.addEventListener("click", createTicket);

loadLastTicket();
