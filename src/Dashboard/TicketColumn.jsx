import React from "react";
import "./TicketColumn.css";

const TicketColumn = ({ status, tickets, onStatusChange }) => {
  const handleDrop = (e) => {
    const id = Number(e.dataTransfer.getData("ticketId"));
    if (status !== "Closed") {
      onStatusChange(id, status);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="ticket-column" onDrop={handleDrop} onDragOver={allowDrop}>
      <h3>{status}</h3>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="ticket-card"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("ticketId", ticket.id)}
        >
          <strong>{ticket.title}</strong>
          <p>{ticket.customer}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketColumn;
