/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
//import { apiCall } from '../api/apiUtils'
import localAPI from './tips.json'

export function tipUtils() {
    const [loading, setLoading] = useState(true);
    const [accountant, setAccountant] = useState(0);

    const [tip, setTip] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTip(localAPI as any);
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