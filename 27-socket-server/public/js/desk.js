const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const drawTicket = document.querySelector("#draw-ticket");
const noMoreAlert = document.querySelector(".alert");
const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");

let workingTicket = null;

const getDeskHeader = () => deskHeader.textContent;

function setDeskHeader() {
  const searchParams = new URLSearchParams(window.location.search);

  if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("Escritorio param es requerido!");
  }

  deskHeader.innerHTML = searchParams.get("escritorio");
}

function setDrawTicket(value = "") {
  value ? (drawTicket.innerHTML = value) : (drawTicket.innerHTML = "...");
}

function setPendingTickets(value = 0) {
  lblPending.innerHTML = value > 0 ? value : "";

  value !== 0
    ? noMoreAlert.classList.add("d-none")
    : noMoreAlert.classList.remove("d-none");
}

async function getPendingTickets() {
  try {
    const resp = await fetch("/api/ticket/pending");

    if (!resp.ok) {
      console.log("Error on fetching");
    }

    const pendingTickets = await resp.json();

    setPendingTickets(pendingTickets.length);
  } catch (error) {
    console.log(error);
  }
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-ticket-count-changed") return;
    setPendingTickets(payload);
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

async function getDraw() {
  try {
    const deskParam = getDeskHeader();
    const resp = await fetch(`/api/ticket/draw/${deskParam}`);

    if (!resp.ok) {
      console.log("Error on fetching");
    }

    const data = await resp.json();

    if (!!workingTicket) {
      await onTicketDone();
    }

    workingTicket = data?.ticket ?? null;

    setDrawTicket(workingTicket?.number);
  } catch (error) {
    console.log(error);
  }
}

async function onTicketDone() {
  if (!workingTicket) return;

  try {
    const resp = await fetch(`/api/ticket/done/${workingTicket.id}`, {
      method: "PUT",
    });

    if (!resp.ok) {
      console.log("Error on fetching");
    }

    setDrawTicket();
  } catch (error) {
    console.log(error);
  }
}

btnDraw.addEventListener("click", getDraw);
btnDone.addEventListener("click", onTicketDone);

setDeskHeader();
getPendingTickets();

connectToWebSockets();
