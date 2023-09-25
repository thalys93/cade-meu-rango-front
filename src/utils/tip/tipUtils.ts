/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
//import { apiCall } from '../api/apiUtils'
import localAPI from './tips.json'

export interface TipModel {
    id: number;
    title: string;
    description: string;
    publishDate: string;
}

export function TipUtils() {
    const [loading, setLoading] = useState(true);
    const [accountant, setAccountant] = useState(0);

    const [tip, setTip] = useState<TipModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTip(localAPI as TipModel[]);
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