import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import TicketForm from "./TicketForm";
import TicketBoard from "./TicketBoard";
import { globalAccess } from "./ContextAPI";

const Dashboard = () => {

  const { tickets, setTickets } = useContext(globalAccess);

  // Load tickets from localStorage only on first mount
  useEffect(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      try {
        setTickets(JSON.parse(stored));
      }
      catch (error) {
        console.error("Error parsing  tickets from localStorage:" , error);
      }
    }
  }, [setTickets]);

  // Update localStorage only if tickets actually change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("tickets", JSON.stringify(tickets));
    }
  }, [tickets]);

  return (
    <>
      <Navbar />
      <TicketForm />
      <TicketBoard />
    </>
  );
};

export default Dashboard;
