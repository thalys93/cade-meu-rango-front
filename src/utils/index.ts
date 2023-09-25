import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export function IndexUtils() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const localStorageLoading = localStorage.getItem("isLoading");

        if (localStorageLoading === "false") {
            setIsLoading(false);
            navigate('/');
        } else {
            const timeout = setTimeout(() => {            
            localStorage.setItem("isLoading", "false")
            setIsLoading(false);            
        }, 2500);

        return () => {
            clearTimeout(timeout);
        }
    }
}, [navigate]);


return { isLoading };
}

