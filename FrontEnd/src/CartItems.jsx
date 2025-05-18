import React from "react";

function CartItems(){
    return(
        <div className="flex flex-nowrap justify-around underline text-2xl">
            <span>Item</span>
            <span>SKU</span>
            <span>Amount</span>
            <span>Price</span>                
        </div>
    )
}

export default CartItems;