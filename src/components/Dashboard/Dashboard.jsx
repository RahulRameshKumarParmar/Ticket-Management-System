import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TicketForm from "./TicketForm";
import TicketBoard from "./TicketBoard";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  // Load tickets from localStorage only on first mount
  useEffect(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  }, []);

  // Update localStorage only if tickets actually change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("tickets", JSON.stringify(tickets));
    }
  }, [tickets]);

  const handleCreateTicket = (ticket) => {
    const updated = [...tickets, ticket];
    setTickets(updated);
  };

  const handleUpdateTicketStatus = (id, newStatus) => {
    const updated = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated)); 
  };

  return (
    <>
      <Navbar/>
      <TicketForm onCreateTicket={handleCreateTicket} />
      <TicketBoard tickets={tickets} setTickets={setTickets} onStatusChange={handleUpdateTicketStatus} />
    </>
  );
};

export default Dashboard;
