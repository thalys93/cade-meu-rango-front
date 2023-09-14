import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export function IndexUtils() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(true);
        }, 1500)

        return () => {
            clearTimeout(timeout);
        }
    }, []);

useEffect(() => {
    if (!isLoading) {
        navigate('/home');
    }
}, [isLoading, navigate]);


return { isLoading };
}

