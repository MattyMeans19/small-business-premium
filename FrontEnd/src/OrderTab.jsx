import React, {useEffect, useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios";
import CartItems from "./CartItems";

function OrderTab(props){
    const [visible, changeVisibility] = useState(false);
    const [orderItems, updateOrderItems] = useState(JSON.parse(props.items));
    const [orderDetails, changeOrderDetails] = useState([]);
    const [Subtotal, changeSub] = useState(0);
    let tax = 0.0835;


        useEffect(() => {
            getItems();
        }, []);

    const getItems = async () =>{
        let itemArray = [];
        for(let i = 0; i < orderItems.length; i++){
        try{
            const response = await axios.post('http://localhost:3000/getOrders', {sku: orderItems[i].sku});
            let orderData = response.data[0];
            itemArray.push(orderData);
            setSubtotal(orderData.price)
        } catch (error){
        console.error('Error fetching User:', error);
            }
        }
        changeOrderDetails(itemArray);
    }

    const setSubtotal = (p) =>{
        let sub = 0;
        for(let i = 0; i < orderItems.length; i++){
        sub += (p * orderItems[i].amount);
        }
        changeSub(sub);
    }

    function View(){
        changeVisibility(!visible);
    }

    const orderFulfilled = async () =>{
        try{
            let orderNumber = props.orderNumber;
            await axios.patch('http://localhost:3000/orderFulfilled', {orderNumber: orderNumber});
        } catch (error){
            console.error('Error fulfilling order:', error);
        }
        alert("Order Marked Fulfilled!");
        window.location.reload();
    }

    const orderCanceled = async() => {
        try{
            let orderNumber = props.orderNumber;
            await axios.patch('http://localhost:3000/orderCanceled', {orderNumber: orderNumber});
        } catch (error){
            console.error('Error fulfilling order:', error);
        }
        alert("Order Marked Canceled!");
        restock();
        window.location.reload();
    }
    
    const restock = async () => {
        let orderObject = [];
        for(let i = 0; i <orderItems.length; i++){
            let newObject = {
                sku: orderItems[i].sku,
                amount: orderItems[i].amount
            }
            orderObject.push(newObject);
        try{
            let order = orderObject;
            await axios.patch('http://localhost:3000/restock', {sku: order[i].sku, amount: order[i].amount});
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }
    }

    return(
        <div className="grid grid-cols-5 mx-10">
        <div className="col-span-full border-1 flex flex-nowrap justify-between bg-blue-200">
            <button className="opacity-25 border-1 m-1 hover:opacity-50 active:opacity-100" onClick={() => (View())}>{visible ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</button>
            <div className="text-2xl basis-1/3 text-center">
                <label htmlFor="customerName">Customer Name: </label>
                <span id="customerName">{props.fName} {props.lName}</span>                            
            </div>
            <div className="text-2xl basis-1/3 text-center">
                <label htmlFor="customerNumber">Contact Number: </label>
                <span id="customerNumber">{props.tel}</span>                            
            </div>
            <div className="text-2xl basis-1/3 text-center">
                <label htmlFor="orderNumber">Order#: </label>
                <span id="orderNumber">{props.orderNumber}</span>                            
            </div>
            <div className="text-2xl basis-1/3 text-center">
                <label htmlFor="status">Status: </label>
                <span id="status">{props.status}</span>                            
            </div>
        </div>
        <div className={[`row-start-2 col-start-4 col-span-2 p-5 border-2 border-l-0 border-t-0 flex flex-col gap-2 bg-white ${visible ? "visible" : "hidden"}`]}>
            <h2 className="text-2xl">Fulfilled: Order has been paid for and picked up by customer.</h2>
            <button className="border-2 p-2 rounded-full bg-emerald-300 hover:bg-emerald-500 active:bg-emerald-700 w-[50%] place-self-center" onClick={() => (orderFulfilled())}>Fulfilled</button>
            <h2 className="text-2xl">Unfulfilled: Order has been canceled/abandoned by customer.</h2>
            <button className="border-2 p-2 rounded-full bg-red-300 hover:bg-red-500 active:bg-red-700 w-[50%] place-self-center" onClick={() => (orderCanceled())}>Unfulfilled</button>
        </div>
        <div className={[`col-span-3 border-x-2 border-t-0 bg-white ${visible ? "visible" : "hidden"} flex flex-col gap-1`]}>
            <div className="flex flex-nowrap justify-between border-b-2 text-2xl">
                <span className="basis-1/4">Item</span>
                <span className="basis-1/4">SKU</span>
                <span className="basis-1/4">Amount</span>
                <span className="basis-1/4">Price</span>                
            </div>
            {orderDetails.map((item, index) => (
                <CartItems 
                    key={index}
                    name={item.name}
                    sku={item.sku}
                    amount={orderItems[index].amount}
                    price={(orderItems[index].amount * item.price).toFixed(2)}
                />
            ))}
        </div>
        <div className={[`col-span-3 flex flex-nowrap border-1 border-b-2 border-x-2 px-10 mb-12 bg-white ${visible ? "visible" : "hidden"}`]}>
            <label htmlFor="subtotal" className="basis-1/16 text-end">Subtotal:</label>
            <span id="subtotal" className="basis-1/3 text-2xl text-center">${Subtotal.toFixed(2)}</span>
            <label htmlFor="tax" className="basis-1/16 text-end">Tax: </label>
            <span id="tax" className="basis-1/3 text-2xl text-center">${(Subtotal * tax).toFixed(2)}</span>
            <label htmlFor="total" className="basis-1/16 text-end">Total: </label>
            <span id="total" className="basis-1/3 text-2xl text-center">${(Subtotal + (Subtotal * tax)).toFixed(2)}</span>
        </div>
    </div>
    )
}

export default OrderTab;
