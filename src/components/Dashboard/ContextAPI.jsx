import { createContext, useState } from "react"

export let globalAccess = createContext();

export default function ContextAPI({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [tickets, setTickets] = useState([]);
    const [newTicketForm, setNewTicketForm] = useState(false);

    const handleCreateTicket = (ticket) => {
        if (!ticket) return; // ignore null tickets

        const updated = [...tickets, ticket];
        setTickets(updated);
        localStorage.setItem("tickets", JSON.stringify(updated));
    };

    const handleUpdateTicketStatus = (id, newStatus) => {
        const updated = tickets.map((ticket) =>
            ticket.id === id ? { ...ticket, status: newStatus } : ticket
        );
        setTickets(updated);
        localStorage.setItem("tickets", JSON.stringify(updated));
    };

    let globalObj = { isLoggedIn, setIsLoggedIn, newTicketForm, setNewTicketForm, tickets, setTickets, handleCreateTicket, handleUpdateTicketStatus };

    return (
        <div>
            <globalAccess.Provider value={globalObj}>
                {children}
            </globalAccess.Provider>
        </div>
    )
}
