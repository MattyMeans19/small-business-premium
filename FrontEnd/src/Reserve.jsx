import React, {useState} from "react";

function Reserve(props){


    return(
        <div className={[`border-5 border-gray-700 min-h-[90%] fixed z-1 inset-15 bg-white p-5 ${props.active ? "visible" : "hidden"} flex flex-wrap gap-5`]}>
            <button className="border-2 p-1 text-2xl hover:bg-red-400 active:bg-red-700 basis-full max-w-[2.5%] max-h-[5%]" onClick={() => (props.onClose())}>X</button>
            <div className="flex flex-wrap place-items-start text-3xl border-15 h-[90%] w-[50%] border-double border-gray-500 p-15 m-5 basis-1/2">
                <span className="basis-full text-center">Customer Info</span>
                <label htmlFor="fName" className="basis-1/3">First Name: </label>
                <input id="fName" className="border-1 basis-1/2"></input>
                <label htmlFor="lName" className="basis-1/3">Last Name: </label>
                <input id="lName" className="border-1 basis-1/2"></input>
                <label htmlFor="pNumber" className="basis-1/3">Phone Number: </label>
                <input id="pNumber" className="border-1 basis-1/2"></input>
            </div>
            <div className="basis-1/3 p-5 flex flex-col gap-10">
                <p className="text-red-600 text-3xl">By reserving this cart your items will be temporarily removed from inventory and placed on hold for you at the store. Your reservation will be canceled after 'X-amount of time'.</p>
                <p className="text-red-600 text-3xl">It's possbile that when orders are made simultaneously there may be inventory conflicts. Please make sure that your telephone number is correct so that the seller may contact you regarding any issues with your reservation.</p>
                <span className="text-4xl">Total: ${props.total}</span>
                <button className="text-3xl border-5 w-[50%] place-self-center rounded-3xl bg-green-400 hover:bg-green-600 active:bg-green-800">Submit</button>
            </div>
        </div>
    )
}

export default Reserve;