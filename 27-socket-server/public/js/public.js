function renderTickets(tickets = []) {
  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break;

    const ticket = tickets[i];

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

    lblTicket.innerText = `Ticket ${ticket.number}`;
    lblDesk.innerHTML = ticket.handleAtDesk;
  }
}

async function ticketsWorkingOn() {
  try {
    const resp = await fetch("/api/ticket/working-on");

    if (!resp.ok) {
      console.log("Error on fetching");
    }

    const tickets = await resp.json();

    if (tickets.length <= 0) return;

    renderTickets(tickets);
  } catch (error) {
    console.log(error);
  }
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-working-changed") return;
    renderTickets(payload);
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

ticketsWorkingOn();
connectToWebSockets();
