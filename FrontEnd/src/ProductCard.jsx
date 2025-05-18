import React from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductCard(props){
    let inStock = true;

    if(props.stock < 1){
        inStock = false;
    }

    return(
        <div className={[`border-double border-5 border-gray-400 bg-white p-5 rounded-3xl flex flex-col gap-4 max-w-[100%] ${inStock ? "visible" : "hidden"}`]}>
            <h3 className="basis-1/10 text-center text-2xl underline">{props.name}</h3>
            <span className="self-center">Item#: {props.sku}</span>
            <span className="self-center">Brand: {props.brand}</span>
            <img src= {props.img} className="w-[15rem] h-[15rem] self-center"></img>
            <p className="self-center italic max-w-[10em]">{props.info}</p>
            <div className="flex flex-nowrap justify-between">
                <span className="self-end text-[1.5rem] border-2 p-2 bg-gray-100">${props.price}</span>           
                <span className="self-end">Stock: {props.stock}</span>
                <button className="self-end border-2 p-2 bg-cyan-200 hover:bg-cyan-500 active:bg-cyan-800"
                onClick={() => props.onAdd(props.name, props.brand, props.sku, props.img, props.info, props.price, props.stock)}>
                    <AddShoppingCartIcon />
                </button>
            </div>

        </div>
    )
}

export default ProductCard;