import { useState } from "react";

export function OffCanvasUtils() {
    // Estados
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
        

    return {
        open,
        toggle,        
    }

}    