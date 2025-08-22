import { useContext, useState } from "react";
import "./TicketColumn.css";
import { globalAccess } from "./ContextAPI";
import { FaTrash } from "react-icons/fa";

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
  const [updateTicket, setUpdateTicket] = useState(false);

  const handleDelete = (id) => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets") || []);
    const updatedStoredTickets = storedTickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedStoredTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedStoredTickets));
  }

  const handleUpdate = (id) => {
    setUpdateTicket(!updateTicket);
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
          <div className="ticket-card-details">
            <strong onClick={() => handleUpdate(ticket.id)}>{(updateTicket && ticket.id)
              ?
              <input type="text" />
              :
              ticket.title
            }</strong>
            <p>{ticket.customer}</p>
          </div>
          <div>
            <button onClick={() => handleDelete(ticket.id)} className="delete-button"><FaTrash size={15}/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketColumn;
