import React, {useEffect, useState} from "react";
import axios from "axios";
import { UpdateAmount } from "./Cart";

function CartItem(props){
    const [available, changeAvailability] = useState(false);
    const [amount, changeAmount] = useState(props.amount)
    const [stock, changeInStock] = useState(0)

        useEffect(() => {
        fetchInventory(props.sku);
    }, []);

        useEffect(() => {
        if(available === false && stock >= amount){
            Availability();
        }
        ;
    }, [available, stock, amount]);

    const fetchInventory = async (sku) => {
        try{
            const response = await axios.post('http://localhost:3000/checkStock', {sku: sku});
            let inStock = response.data[0].stock;
            changeInStock(inStock)
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    function addAmount(){
        if(amount < stock){
            let newAmount = amount + 1;
            changeAmount(newAmount);
            UpdateAmount(newAmount, props.id);
            props.onChangeAmount(props.price);
        } else{
            alert("Max amount is: " + stock)
        }
    }

    function subtract(){
        if(amount > 1){
            subtractAmount();
        } else{
            alert("Min Amount is: 1")
        }
    }

    const subtractAmount = () => {
            changeAmount(prevamount => {
                    const setAmount = prevamount - 1;
                    UpdateAmount(setAmount, props.id);
                    return setAmount;
                    });
            window.location.reload();
    }

    const Availability = () => {
        changeAvailability( prevchangeAvailability =>{
            const setAvailability = !prevchangeAvailability;
            return setAvailability;
        });
    }

    return(
        <div className={[`grow border-2 px-10 pt-2 grid grid-cols-5 gap-auto text-3xl ${available ? "bg-green-400" : "bg-red-400"} w-[98%] place-self-center rounded-3xl my-2`]}>
            <span className="text-center"><button className="border-1 p-1 bg-red-500 active:bg-red-700" onClick={() => (props.onDelete(props.id))}>x</button> {props.name}</span>
            <span className="text-center">{props.sku}</span>
            <div className="text-center flex flex-nowrap gap-2 justify-center">
                <button className="border-1 px-1 h-10 bg-gray-200 hover:bg-gray-400 active:bg-gray-600 basis-1/3 max-w-[15%]" onClick={() => (subtract())}>-</button>
                <span className="text-5xl basis-1/3">{amount}</span>
                <button className="border-1 px-1 h-10 bg-gray-200 hover:bg-gray-400 active:bg-gray-600 basis-1/3 max-w-[15%]" onClick={() => (addAmount())}>+</button>
            </div>
            <span className="text-center">${props.price}</span>
            <span className="text-center">${(props.price * amount).toFixed(2)}</span>
        </div>        
    )
}

export default CartItem;