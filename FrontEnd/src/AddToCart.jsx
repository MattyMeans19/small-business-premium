import React, {useState} from "react";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import cart, {addToCart} from "./Cart";
import axios from "axios";

function AddToCart(props){
    const [amount, changeAmount] = useState(1);
    let info = props.productInfo;

    function addAmount(){
        if(amount < info.stock){
            let newAmount = amount + 1;
            changeAmount(newAmount);
        } else{
            alert("Max amount reached!");
        }
    }

    function subtractAmount(){
        if(amount > 1 ){
            let newAmount = amount - 1;
            changeAmount(newAmount);
        } else{
            alert("Min amount reached!");
        }
    }

    function VerifyStock(){
        try{
            const response = axios.get('http://localhost:3000/inventory');
            SetInventory(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    function updateCart(){
        addToCart(info.name, info.sku, amount, info.price);
        changeAmount(1);
    }

    function Close(){
        props.onClose()
        changeAmount(1);
    }


    return(
        <div className={[`border-10 border-gray-700 bg-white rounded-3xl mx-[5%] gap-5 flex flex-col md:flex-row md:text-2xl place-items-center fixed inset-5 z-1 ${props.visiblilty ? "visible" : "hidden"}`]}>
            <button onClick={() => (Close())} className="place-self-start p-2"><CancelPresentationIcon /></button>
            <div className="basis-1/2 md:flex flex-col place-items-center gap-5 border-3 p-10 hidden md:visible">
                <span>{info.name}</span>
                <span>{info.brand}</span>
                <span>{info.sku}</span>
                <img src={info.image} className="size-[25rem] self-center"></img>
                <span>{info.info}</span>
                <span>{info.price}</span>
                <span>Available: {info.stock}</span>
            </div>
            <div className="basis-1/2 place-self-start mt-10 flex flex-col gap-10">
                <p className="text-red-500 text-center underline grow">Items added to cart will not affect available inventory until the items are reserved. Current availabilty is subject to change.</p>
                <span className="text-center md:hidden">{info.name}</span>
                <img src={info.image} className="size-[5rem] self-center md:hidden"></img>
                <span className="text-center md:hidden">Available: {info.stock}</span>
                <div className="md:mt-30 grow h-[100%] flex flex-wrap gap-10 md:text-5xl justify-center">
                    <button className="basis-1/8 border-4 bg-gray-300 hover:bg-gray-500 active:bg-gray-700" onClick={() => (subtractAmount())}>-</button>
                    <span className="basis-1/4 text-center border-4 p-2">{amount}</span>
                    <button className="basis-1/8 border-4 bg-gray-300 hover:bg-gray-500 active:bg-gray-700" onClick={() => (addAmount())}>+</button>
                    <span className="basis-1/2">Subtotal: $ {(info.price * amount).toFixed(2)}</span>
                    <button className="basis-full text-center md:mr-10 border-4 md:rounded-full md:max-w-[50%] p-3 bg-blue-300 hover:bg-blue-500 active:bg-blue-700" onClick={() => (updateCart())}>Add to Cart</button>
                </div>
            </div>         
        </div>

    )
}

export default AddToCart;