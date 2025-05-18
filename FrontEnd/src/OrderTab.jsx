import React, {useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CartItems from "./CartItems";

function OrderTab(){
    const [visible, changeVisibility] = useState(false);

    function View(){
        changeVisibility(!visible);
    }
    return(
        <div className="grid grid-cols-5 mx-10">
        <div className="col-span-full border-1 flex flex-nowrap justify-between bg-blue-200">
            <button className="opacity-25 border-1 m-1 hover:opacity-50 activ:opacity-100" onClick={() => (View())}>{visible ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</button>
            <div className="text-2xl basis-1/3">
                <label htmlFor="customerName">Customer Name: </label>
                <span id="customerName">John Doe</span>                            
            </div>
            <div className="text-2xl basis-1/3">
                <label htmlFor="customerNumber">Contact Number: </label>
                <span id="customerNumber">555-555-5555</span>                            
            </div>
            <div className="text-2xl basis-1/3">
                <label htmlFor="orderNumber">Order#: </label>
                <span id="orderNumber">0</span>                            
            </div>
        </div>
        <div className={[`row-start-2 col-start-4 col-span-2 p-5 border-2 border-l-0 border-t-0 flex flex-col gap-2 bg-white ${visible ? "visible" : "hidden"}`]}>
            <h2 className="text-2xl">Fulfilled: Order has been paid for and picked up by customer.</h2>
            <button className="border-2 p-2 rounded-full bg-emerald-300 hover:bg-emerald-500 active:bg-emerald-700 w-[50%] place-self-center">Fulfilled</button>
            <h2 className="text-2xl">Abandoned: Order has been abandoned by customer.</h2>
            <button className="border-2 p-2 rounded-full bg-gray-300 hover:bg-gray-500 active:bg-gray-700 w-[50%] place-self-center">Abandoned</button>
            <h2 className="text-2xl">Cancelled: Order has been cancelled by customer.</h2>
            <button className="border-2 p-2 rounded-full bg-red-300 hover:bg-red-500 active:bg-red-700 w-[50%] place-self-center">Cancelled</button>
        </div>
        <div className={[`col-span-3 border-x-2 border-t-0 bg-white ${visible ? "visible" : "hidden"}`]}>
            <CartItems />
        </div>
        <div className={[`col-span-3 flex flex-nowrap border-1 border-b-2 border-x-2 px-10 mb-12 bg-white ${visible ? "visible" : "hidden"}`]}>
            <label htmlFor="subtotal" className="basis-1/16 text-end">Subtotal:</label>
            <span id="subtotal" className="basis-1/3 text-2xl text-center">$0.00</span>
            <label htmlFor="tax" className="basis-1/16 text-end">Tax: </label>
            <span id="tax" className="basis-1/3 text-2xl text-center">$0.00</span>
            <label htmlFor="total" className="basis-1/16 text-end">Total: </label>
            <span id="total" className="basis-1/3 text-2xl text-center">$0.00</span>
        </div>
    </div>
    )
}

export default OrderTab;