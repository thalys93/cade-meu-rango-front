import { useState } from "react";

export function OffCanvasUtils() {
    // Estados
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    

    const [adminUser] = useState(
        {usuario: 'admin', password: 'admin'}        
    )

    return {
        open,
        toggle,
        adminUser
    }

}    