import { useDraggable } from "@dnd-kit/core";
import { FaTrash } from "react-icons/fa";

const DraggableTicket = ({ ticket, onDelete, newTicketForm }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: ticket.id.toString(),
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        backgroundColor: newTicketForm ? "grey" : "white",
    };

    return (
        <div
            ref={setNodeRef}
            className="ticket-card"
            style={style}
            {...listeners}   // ✅ keep inline
            {...attributes}  // ✅ keep inline
        >
            <div className="ticket-card-details">
                <strong>{ticket.title}</strong>
                <p>{ticket.customer}</p>
            </div>
            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(ticket.id)
            }}
                className="delete-button">
                <FaTrash size={15} />
            </button>
        </div>
    );
};

export default DraggableTicket;