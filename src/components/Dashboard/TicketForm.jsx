import { useState } from "react";
import "./TicketForm.css";

const TicketForm = ({ onCreateTicket }) => {
  const [customer, setCustomer] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Assigned");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!customer || !title) {
      alert("Please fill all fields");
      return;
    }

    const newTicket = {
      id: Date.now(), // unique ID
      customer: customer,
      title: title,
      status: status,
    };

    onCreateTicket(newTicket);

    // Reset form
    setCustomer("");
    setTitle("");
    setStatus("Assigned");
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Assigned</option>
        <option>In Process</option>
        <option>Resolved</option>
        <option>Deployed</option>
        <option>Closed</option>
      </select>
      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default TicketForm;
