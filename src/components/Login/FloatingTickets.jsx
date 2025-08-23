import './FloatingTickets.css';
import { useState } from 'react';

export default function FloatingTickets() {

    const [activeTicket, setActiveTicket] = useState(null);

    const ticketsData = [
        {
            id: 1,
            title: "Feature request",
            status: "Assigned",
            transform: "rotate(-10deg)"
        },
        {
            id: 2,
            title: "Email delivery problem",
            status: "Resolved",
            transform: "rotate(10deg)"
        },
        {
            id: 3,
            title: "Bug in dashboard",
            status: "In Process",
            transform: "rotate(-14deg)"
        }
    ]
    return (
        <div>
            {ticketsData.map((ticket, index) => {
                return (
                    <div onClick={() => {
                        setActiveTicket(ticket.id);
                    }} style={{"--ticket-animation": `${ticket.transform}`, backgroundColor: `${activeTicket === ticket.id ? "white" : "whitesmoke"}`}} className={`floating-tickets ticket-${index + 1} ${(activeTicket === ticket.id) ? "ticket-highlight" : null}`} key={ticket.id}>
                        <h2 className='floating-tickets-title'>{ticket.title}</h2>
                        <p className='floating-tickets-status'>{ticket.status}</p>
                    </div>
                )
            })}
        </div>
    )
}
