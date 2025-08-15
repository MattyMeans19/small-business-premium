import React, {useEffect, useState} from "react";
import axios from "axios";
import { BASE_URL } from "./constants";

function Reserve(props){
    const [fName, changeFName] = useState("");
    const [lName, changeLName] = useState("");
    const [tel, changeTel] = useState("");
    const [orders, updateOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/orders`);
        updateOrders([... response.data]);
    } catch (error){
        console.error('Error fetching User:', error);
    }
}

    function fNameChange(){
        let newFName = document.getElementById("fName").value;
        changeFName(newFName);
    }

    function lNameChange(){
        let newLName = document.getElementById("lName").value;
        changeLName(newLName);
    }

    function telChange(){
        let newTel = document.getElementById("pNumber").value;
        changeTel(newTel);
    }

    function generateOrder(){
        let day = new Date().getDay();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();

        let orderNumber = day + month + year + orders.length;
        console.log(orderNumber);
        submitOrder(orderNumber);
    }

    function submitOrder(o){
        props.onSubmit(fName, lName, tel, o);
    }

    return(
        <div className={[`border-5 border-gray-700 h-screen w-screen fixed z-1 bg-white md:p-10 ${props.active ? "visible" : "hidden"} flex flex-col md:gap-5`]}>
            <button className="border-2 p-1 text-2xl bg-red-500 hover:bg-red-700 active:bg-red-900 basis-full md:max-w-[2.5%] md:max-h-[5%]" onClick={() => (props.onClose())}>X</button>
            <div className="place-self-center flex flex-wrap place-items-start md:text-3xl border-15 h-[90%] md:w-[50%] border-double border-gray-500 p-15 m-5 basis-1/2">
                <span className="basis-full text-center">Customer Info</span>
                <label htmlFor="fName" className="md:basis-1/3">First Name: </label>
                <input id="fName" className="border-1 md:basis-1/2" onChange={() => (fNameChange())}></input>
                <label htmlFor="lName" className="md:basis-1/3">Last Name: </label>
                <input id="lName" className="border-1 md:basis-1/2" onChange={() => (lNameChange())}></input>
                <label htmlFor="pNumber" className="md:basis-1/3">Phone Number: </label>
                <input id="pNumber" className="border-1 md:basis-1/2" onChange={() => (telChange())}></input>
            </div>
            <div className="basis-1/3 p-5 flex flex-col md:flex-wrap gap-10">
                <p className="text-red-600 md:text-3xl">By reserving this cart your items will be temporarily removed from inventory and placed on hold for you at the store. Your reservation will be canceled after 'X-amount of time'.</p>
                <p className="text-red-600 md:text-3xl">It's possbile that when orders are made simultaneously there may be inventory conflicts. Please make sure that your telephone number is correct so that the seller may contact you regarding any issues with your reservation.</p>
                <span className="md:text-4xl">Total: ${props.total}</span>
                <button className="md:text-3xl border-5 w-[50%] place-self-center rounded-3xl bg-green-400 hover:bg-green-600 active:bg-green-800" onClick={() => (generateOrder())}>Submit</button>
            </div>
        </div>
    )
}

export default Reserve;