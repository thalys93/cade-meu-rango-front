import { useEffect } from "react";
import { getTips } from "../api/apiUtils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setTip } from "../redux/tipSlice";
import { setStates } from "../redux/appSlice";

export function TipUtils() {
    const dispatch = useDispatch();
    const commonStates = useSelector((state: RootState) => state.commonState);
    const tipStates = useSelector((state: RootState) => state.tipState);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTips();
                dispatch(setTip(response));
                setTimeout(() => {
                    dispatch(setStates({ loading: true }))
                }, 1500);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [dispatch]);
    return {
        tip: tipStates,
        loading: commonStates        
    }
}