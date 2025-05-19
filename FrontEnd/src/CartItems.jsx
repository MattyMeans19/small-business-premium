import React from "react";

function CartItems(props){
    return(
        <div className="flex flex-nowrap justify-between border-b-1 text-2xl">
            <span className="basis-1/4">{props.name}</span>
            <span className="basis-1/4">{props.sku}</span>
            <span className="basis-1/4">{props.amount}</span>
            <span className="basis-1/4">{props.price}</span>                
        </div>
    )
}

export default CartItems;