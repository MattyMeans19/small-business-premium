import React, {useEffect, useState} from "react";
import axios from "axios";
import { UpdateAmount } from "./Cart";
import ItemCard from "./ItemCard";
import { BASE_URL } from "./constants";

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
            const response = await axios.post(`${BASE_URL}/checkStock`, {sku: sku});
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
            if(available == false){
                window.location.reload();
            }
    }

    const Availability = () => {
        changeAvailability( prevchangeAvailability =>{
            const setAvailability = !prevchangeAvailability;
            return setAvailability;
        });
    }

    return(
        <ItemCard 
        onDelete={() => props.onDelete(props.id)}
        onSubtract={() => (subtract())}
        onAdd={() => (addAmount())}
        amount={amount}
        name={props.name}
        sku={props.sku}
        price={props.price}
        available={available}
        />
    )
}

export default CartItem;