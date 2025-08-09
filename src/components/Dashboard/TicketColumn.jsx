import { useContext } from "react";
import "./TicketColumn.css";
import { globalAccess } from "./ContextAPI";

const TicketColumn = ({ status, tickets, setTickets, onStatusChange }) => {
  const handleDrop = (e) => {
    const id = Number(e.dataTransfer.getData("ticketId"));
    if (status !== "Closed") {
      onStatusChange(id, status);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  let { newTicketForm } = useContext(globalAccess);

  const handleDelete = (id) => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets") || []);
    const updatedStoredTickets = storedTickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedStoredTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedStoredTickets));
  }

  return (
    <div style={{ backgroundColor: newTicketForm ? "grey" : " #f1f8ff" }} className={`ticket-column ${(newTicketForm) ? "" : "hover-enabled"}`} onDrop={handleDrop} onDragOver={allowDrop}>
      <h3>{status}</h3>
      {tickets.map((ticket) => (
        <div
          style={{ backgroundColor: newTicketForm ? "grey" : "white" }}
          key={ticket.id}
          className="ticket-card"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("ticketId", ticket.id)}
        >
          <div>
            <strong>{ticket.title}</strong>
            <p>{ticket.customer}</p>
          </div>
          <div>
            <button onClick={() => handleDelete(ticket.id)} className="delete-button">&#128465;</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketColumn;
