import React, {useEffect, useState, useRef} from "react";
import ConsoleNav from "./ConsoleNav";
import OrderTab from "./OrderTab";
import axios from "axios";
import { useNavigate } from "react-router";

function Dashboard(){

    const [currentUser, ChangeUser] = useState("");
    const [userRole, changeUserRole] = useState("");
    const [orders, updateOrders] = useState([]);
    let navigate = useNavigate();
    

    useEffect(() => {
        fetchUser();
        fetchOrders();
    }, []);

    const fetchUser = async () => {
    try{
        const response = await axios.get('http://localhost:3000/user');
        if(response.data.currentUser != ""){
            ChangeUser(response.data.currentUser);
            changeUserRole(response.data.currentRole);
        } else{
            navigate("/business-portal")
        }
    } catch (error){
        console.error('Error fetching User:', error);
    }
}

    const fetchOrders = async () => {
    try{
        const response = await axios.get('http://localhost:3000/orders');
        updateOrders([... response.data]);
    } catch (error){
        console.error('Error fetching User:', error);
    }
}

    return(
        <div>
            <ConsoleNav
                inventory="../inventory"
                message="../dailymessage"
                admin="../admin"
                dashboard="../orders"
                visible="visible"
                currentUser = {currentUser}
                userRole = {userRole}       
            />
            <div className="flex flex-col">
                <h1 className="text-center my-10 border-b-10 border-double rounded-3xl text-7xl">Orders</h1>
                <span className="text-4xl text-center border-3 rounded-t-3xl bg-gray-500 py-5 mx-10">Pending Orders</span>
                <div className="flex flex-col gap-2">
                {orders.map((order, index) => (
                    <OrderTab 
                        key={index}
                        fName={order.fname}
                        lName={order.lname}
                        tel={order.tel}
                        items={order.itemarray}
                    />
                ))}                    
                </div>

            </div>
          
        </div>

    )
}

export default Dashboard;