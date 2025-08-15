import React, {useEffect, useState} from "react";
import { Link} from "react-router";
import axios from "axios";
import { BASE_URL } from "./constants";

function ConsoleNav(props){
    const [pendingOrders, togglePendingOrders] = useState(false);

        useEffect(() => {
            checkOrders();
            const orderCheck = setInterval(() =>{
                checkOrders();
            }, 10000);
            return () => clearInterval(orderCheck);
        }, []);
    
    const LogOut = async () => {
        try{
            await axios.post(`${BASE_URL}/logout`);
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }

    const checkOrders = async () =>{
        try{
            const response = await axios.get(`${BASE_URL}/pendingorders`);
            let orders = response.data;
            if(orders.length > 0){
                togglePendingOrders(true);
            }
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }


    return(
        <div className="max-w-screen flex flex-col border-3 border-double bg-gray-600 gap-5">
            <div className="text-2xl grow flex max-w-screen">
                <div  className="flex flex-col grow">
                    <h1 className="text-2xl">{props.currentUser.toUpperCase()}</h1>
                    <span className="text-sm ml-2">{props.userRole}</span>
                </div>
                <button className={[`border-2 border-double p-2 rounded-3xl bg-gray-400 self-end hover:bg-gray-600 active:bg-gray-800 ${props.visible}`]} onClick={LogOut}><Link to="/business-portal">Log Out</Link></button>   
            </div>
            <div className="max-w-screen grow">
                <ul className="flex justify-between">
                    <li className={[`border-2 basis-1/6 text-center rounded-t-full bg-gray-400 text-nowrap ${pendingOrders ? "animate-ping rounded-full bg-sky-400 opacity-75" : null }`]}><Link to={props.dashboard} className="px-15">Orders</Link></li>
                    <li className="border-2 basis-1/6 text-center rounded-t-full bg-gray-400 text-nowrap"><Link to={props.inventory} className="px-15">Inventory</Link></li>
                    <li className="border-2 basis-1/6 text-center rounded-t-full bg-gray-400 text-nowrap"><Link to={props.message} className="px-15">Message of the Day</Link></li>
                    <li className="border-2 basis-1/6 text-center rounded-t-full bg-gray-400 text-nowrap"><Link to={props.admin} className="px-15">Admin Tools</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ConsoleNav;