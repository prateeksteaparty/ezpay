import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import backendUrl from "../../config";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null); // State to hold the balance
    const [loading, setLoading] = useState(true); // State to indicate loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch balance from the backend
        axios
            .get(`${backendUrl}/api/v1/account/balance`, {  // Use backticks here
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                const rawBalance = response.data.balance;
                const formatBalance = Number(rawBalance).toFixed(2);
                setBalance(formatBalance); 
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch balance:", err.response?.data || err.message);
                setError("Failed to fetch balance.");
                setLoading(false);
            });
    }, []); 

    return (
        <div>
            <Appbar />
            <div className="m-8">
                {loading ? (
                    <div>Loading...</div> 
                ) : error ? (
                    <div className="text-red-600">{error}</div> 
                ) : (
                    <Balance value={balance || "0"} />  
                )}
                <Users />
            </div>
        </div>
    );
};
