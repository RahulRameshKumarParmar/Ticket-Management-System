import { useContext } from "react";
import "./TicketBoard.css";
import TicketColumn from "./TicketColumn";
import { globalAccess } from "./ContextAPI";

const statuses = ["Assigned", "In Process", "Resolved", "Deployed", "Closed"];

const TicketBoard = ({ tickets, setTickets, onStatusChange }) => {
  let { newTicketForm, setNewTicketForm } = useContext(globalAccess);

  return (
    <div onClick={() => setNewTicketForm(false)} style={{backgroundColor: newTicketForm ? "grey" : "white"}} className="ticket-board">
      {statuses.map((status) => (
        <TicketColumn
          key={status}
          status={status}
          tickets={tickets.filter((t) => t.status === status)}
          setTickets={setTickets}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TicketBoard;
