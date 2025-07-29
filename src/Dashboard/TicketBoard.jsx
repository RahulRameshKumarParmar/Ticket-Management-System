import React from "react";
import "./TicketBoard.css";
import TicketColumn from "./TicketColumn";

const statuses = ["Assigned", "In Process", "Resolved", "Deployed", "Closed"];

const TicketBoard = ({ tickets, onStatusChange }) => {
  return (
    <div className="ticket-board">
      {statuses.map((status) => (
        <TicketColumn
          key={status}
          status={status}
          tickets={tickets.filter((t) => t.status === status)}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TicketBoard;
