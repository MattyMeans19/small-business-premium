import React, {useState} from "react";

function ItemCard(props){

    return(
        <div className={[`grow border-2 px-10 pt-2 flex flex-col md:grid grid-cols-5 gap-5 md:gap-auto text-3xl ${props.available ? "bg-green-400" : "bg-red-400"} w-[98%] place-self-center rounded-3xl my-2`]}>
            <div className="flex flex-nowrap">
                <button className="border-1 p-1 bg-gray-500 active:bg-gray-700 place-self-start basis-1/8 rounded-2xl" onClick={() => (props.onDelete())}>x</button> 
                <span className="text-center basis-6/8 place-self-center">{props.name}</span> 
            </div>
            <span className="text-center"><span className="md:hidden">SKU: </span>{props.sku}</span>
            <div className="text-center flex flex-nowrap gap-2 justify-center">
                <button className="border-1 px-1 h-10 w-25 bg-gray-200 hover:bg-gray-400 active:bg-gray-600 basis-1/3 max-w-[15%]" onClick={() => (props.onSubtract())}>-</button>
                <span className="text-5xl basis-1/3">{props.amount}</span>
                <button className="border-1 px-1 h-10 w-25 bg-gray-200 hover:bg-gray-400 active:bg-gray-600 basis-1/3 max-w-[15%]" onClick={() => (props.onAdd())}>+</button>
            </div>
            <span className="text-center">${props.price}</span>
            <span className="text-center"><span className="md:hidden">Subtotal: </span>${(props.price * props.amount).toFixed(2)}</span>
        </div> 
    )
}

export default ItemCard;