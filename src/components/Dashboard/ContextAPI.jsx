import { createContext, useState } from "react"

export let globalAccess = createContext();

export default function ContextAPI({ children }) {
    const [newTicketForm, setNewTicketForm] = useState(false);
    let globalObj = {newTicketForm, setNewTicketForm};

    return (
        <div>
            <globalAccess.Provider value={globalObj}>
                {children}
            </globalAccess.Provider>
        </div>
    )
}
