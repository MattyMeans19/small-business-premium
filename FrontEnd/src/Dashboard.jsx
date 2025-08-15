import React, {useEffect, useState, useRef} from "react";
import ConsoleNav from "./ConsoleNav";
import OrderTab from "./OrderTab";
import NonPendingOrder from "./NonPendingTab";
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "./constants";

function Dashboard(){

    const [currentUser, ChangeUser] = useState("");
    const [userRole, changeUserRole] = useState("");
    const [orders, updateOrders] = useState([]);
    const [viewPending, changeViewPending] = useState(true);
    const [nonPendingOrders, changeNonPending] = useState([]);
    const [viewStatus, changeViewStatus] = useState("")
    let navigate = useNavigate();
    

    useEffect(() => {
        fetchUser();
        fetchOrders();
    }, []);

    const fetchUser = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/user`);
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
        const response = await axios.get(`${BASE_URL}/pendingorders`);
        updateOrders([... response.data]);
    } catch (error){
        console.error('Error fetching User:', error);
    }
}

    const viewOrders = async (status) => {
    try{
        const response = await axios.post(`${BASE_URL}/vieworders`, {status: status});
        changeNonPending([... response.data]);
    } catch (error){
        console.error('Error fetching User:', error);
    }
}

    const clearList = async () =>{
        try{
            await axios.patch(`${BASE_URL}/orderStatusPurge`, {status: viewStatus});
        } catch (error){
            console.error('Error purging list:', error);
        }
        if(viewStatus === "fulfilled"){
            alert("All orders marked 'Fulfilled' deleted!");
        }else{
            alert("All orders marked 'Unfulfilled' deleted!");
        }
        
        window.location.reload();
    }

    function ViewPendingOrders(){
        changeViewPending(true);
        fetchOrders();
    }

    function viewNonPendingOrders(status){
        changeViewPending(false);
        viewOrders(status);
        changeViewStatus(status);
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
                <span className="text-center text-red-500 text-2xl mb-5">*If orders tab is flashing but no new orders are showing, refresh the page!</span>
                <span className="text-4xl text-center border-3 rounded-t-3xl bg-gray-500 py-5 mx-10">Pending Orders</span>
                <div className="flex flex-nowrap justify-around text-2xl border-3 bg-gray-400 mb-1">
                    <button className="mt-2 border-2 rounded-t-full px-5 bg-gray-300" onClick={() =>(ViewPendingOrders("pending"))}>Pending</button>
                    <button className="mt-2 border-2 rounded-t-full px-5 bg-gray-300" onClick={() =>(viewNonPendingOrders("fulfilled"))}>Fulfilled</button>
                   <button className="mt-2 border-2 rounded-t-full px-5 bg-gray-300" onClick={() =>(viewNonPendingOrders("canceled"))}>Unfulfilled</button>
                </div>
                {viewPending ? 
                <div className="flex flex-col gap-2">
                {orders.map((order, index) => (
                    <OrderTab 
                        key={index}
                        fName={order.fname}
                        lName={order.lname}
                        tel={order.tel}
                        items={order.itemarray}
                        orderNumber={order.ordernumber}
                        status={order.status}
                    />
                ))}                    
                </div> :
                <div className="flex flex-col gap-2">
                    <button className="text-4xl border-3 w-[30%] place-self-center rounded-full bg-red-500 active:bg-red-700" onClick={() => (clearList())}>Clear DataBase</button>
                    <span className="text-center text-red-500">Once deleted this list can NOT be restored!</span>
                {nonPendingOrders.map((order, index) => (
                    <NonPendingOrder 
                         key={index}
                        fName={order.fname}
                        lName={order.lname}
                        tel={order.tel}
                        items={order.itemarray}
                        orderNumber={order.ordernumber}
                        status={order.status}
                    />
                ))}
                </div>}

            </div>
          
        </div>

    )
}

export default Dashboard;