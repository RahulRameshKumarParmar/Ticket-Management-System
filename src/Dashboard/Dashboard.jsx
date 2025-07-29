import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TicketForm from "./TicketForm";
import TicketBoard from "./TicketBoard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);
  }, []);

  // Save to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleCreateTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const handleUpdateTicketStatus = (id, newStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <TicketForm onCreateTicket={handleCreateTicket} />
      <TicketBoard tickets={tickets} onStatusChange={handleUpdateTicketStatus} />
    </>
  );
};

export default Dashboard;
