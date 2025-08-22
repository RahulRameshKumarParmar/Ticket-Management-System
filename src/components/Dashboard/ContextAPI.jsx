import { createContext, useState } from "react"

export let globalAccess = createContext();

export default function ContextAPI({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    
    const [newTicketForm, setNewTicketForm] = useState(false);
    let globalObj = {isLoggedIn, setIsLoggedIn, newTicketForm, setNewTicketForm};

    return (
        <div>
            <globalAccess.Provider value={globalObj}>
                {children}
            </globalAccess.Provider>
        </div>
    )
}
