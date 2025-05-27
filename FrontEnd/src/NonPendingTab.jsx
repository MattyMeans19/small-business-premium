import React, {useEffect, useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios";
import CartItems from "./CartItems";


function NonPendingOrder(props){
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

    return(
        <div className="grid grid-cols-5 mx-10">
        <div className="col-span-full border-1 flex flex-nowrap justify-between bg-blue-200">
            <button className="opacity-25 border-1 m-1 hover:opacity-50 activ:opacity-100" onClick={() => (View())}>{visible ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</button>
            <div className="text-2xl basis-1/3 text-start">
                <label htmlFor="customerName">Customer Name: </label>
                <span id="customerName">{props.fName} {props.lName}</span>                            
            </div>
            <div className="text-2xl basis-1/3 text-start">
                <label htmlFor="customerNumber">Contact Number: </label>
                <span id="customerNumber">{props.tel}</span>                            
            </div>
            <div className="text-2xl basis-1/3 text-start">
                <label htmlFor="orderNumber">Order#: </label>
                <span id="orderNumber">{props.orderNumber}</span>                            
            </div>
            <div className="text-2xl basis-1/3 text-start">
                <label htmlFor="status">Status: </label>
                <span id="status">{props.status}</span>                            
            </div>
        </div>

        <div className={[`col-span-3 border-x-2 border-y-1 bg-white ${visible ? "visible" : "hidden"} flex flex-col gap-1`]}>
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
        <div className={[`col-span-2 flex flex-col border-1 border-b-2 border-x-2 px-10 mb-12 bg-white ${visible ? "visible" : "hidden"}`]}>
            <label htmlFor="subtotal" className="text-center">Subtotal:</label>
            <span id="subtotal" className="text-2xl text-center">${Subtotal.toFixed(2)}</span>
            <label htmlFor="tax" className="text-center">Tax: </label>
            <span id="tax" className="text-2xl text-center">${(Subtotal * tax).toFixed(2)}</span>
            <label htmlFor="total" className="text-center">Total: </label>
            <span id="total" className="text-2xl text-center">${(Subtotal + (Subtotal * tax)).toFixed(2)}</span>
        </div>
    </div>
    )
}

export default NonPendingOrder;