const currentTicketLabel = document.querySelector("#lbl-new-ticket");
const createTicketBtn = document.querySelector("button");

const baseUrl = "/api/ticket";

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

function setLastTickets(value) {
  currentTicketLabel.innerHTML = `Tickets ${value}`;
}

async function loadLastTicket() {
  const numberOfTickets = await getLastTicket();

  setLastTickets(numberOfTickets);
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

    setLastTickets(newTicket.number);
  } catch (error) {
    console.log(error);
  }
}

createTicketBtn.addEventListener("click", createTicket);

loadLastTicket();
