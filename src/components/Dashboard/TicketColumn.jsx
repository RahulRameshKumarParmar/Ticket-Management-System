import { useContext } from "react";
import { useDroppable } from "@dnd-kit/core";
import "./TicketColumn.css";
import { globalAccess } from "./ContextAPI";
import DraggableTicket from "./DraggableTicket";

const TicketColumn = ({ status, tickets }) => {

  const { newTicketForm, tickets: allTickets, setTickets } = useContext(globalAccess);

  const { setNodeRef, isOver } = useDroppable({ id: status });

  // Only allow drag-over highlight if not Closed
  const isDroppable = status !== "Closed";

  const handleDelete = (id) => {
    const updated = allTickets.filter((t) => t?.id !== id);
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  };

  return (
    <div
      ref={setNodeRef}
      style={{ backgroundColor: newTicketForm ? "grey" : "#f1f8ff", cursor: status === "Closed" ? "no-drop" : "grab" }}
      className={`ticket-column ${newTicketForm ? "" : "hover-enabled"} ${isOver && isDroppable ? "drag-over" : ""
        }`}
    >
      <h3>{status}</h3>
      {tickets.map((t) => (
        <DraggableTicket
          key={t.id}
          ticket={t}
          onDelete={handleDelete}
          newTicketForm={newTicketForm}
        />
      ))}
    </div>
  );
};

export default TicketColumn;
