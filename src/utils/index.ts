import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export function IndexUtils() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2500)

        return () => {
            clearTimeout(timeout);
        }
    }, []);

useEffect(() => {
    if (!isLoading) {
        navigate('/');
    }
}, [isLoading, navigate]);


return { isLoading };
}

