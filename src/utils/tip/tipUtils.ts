import { useEffect, useState } from "react";
import { TipModel } from "../interfaces/Tips";
import { getTips } from "../api/apiUtils";
// import localAPI from './tips.json'

export function TipUtils() {
    const [loading, setLoading] = useState(true);
    const [accountant, setAccountant] = useState(0);

    const [tip, setTip] = useState<TipModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTips();

                setTip(response);
                setTimeout(() => {
                    setLoading(true);
                }, 1500);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setAccountant(accountant => accountant + 1);
            }, 120);

            return () => {
                clearInterval(interval);
            }
        }
    }, [loading]);

    return { tip, loading, accountant }
}