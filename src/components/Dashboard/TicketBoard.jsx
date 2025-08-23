import { useContext } from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import "./TicketBoard.css";
import TicketColumn from "./TicketColumn";
import { globalAccess } from "./ContextAPI";

const statuses = ["Assigned", "In Process", "Resolved", "Deployed", "Closed"];

const TicketBoard = () => {

  const { newTicketForm, setNewTicketForm, tickets, setTickets, handleUpdateTicketStatus } = useContext(globalAccess);

  // ✅ Enable drag for both mouse and touch
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200, // press and hold for 200ms before drag starts
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = ({ over, active }) => {
    if (!over || !active) return;

    const newStatus = over.id;
    if (newStatus === "Closed") return;

    const activeTicket = tickets.find((t) => t?.id?.toString() === active.id);
    if (!activeTicket || activeTicket.status === newStatus) return;

    const updated = tickets.map((t) =>
      t?.id?.toString() === active.id ? { ...t, status: newStatus } : t
    );

    const cleaned = updated.filter(Boolean);
    setTickets(cleaned);
    localStorage.setItem("tickets", JSON.stringify(cleaned));

    if (handleUpdateTicketStatus) {
      handleUpdateTicketStatus(Number(active.id), newStatus);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        onClick={() => setNewTicketForm(false)}
        style={{ backgroundColor: newTicketForm ? "grey" : "white" }}
        className="ticket-board"
      >
        {statuses.map((status) => (
          <TicketColumn
            key={status}
            status={status}
            tickets={tickets.filter((t) => t && t.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default TicketBoard;
