import React from "react";
import NavBar from "./NavBar";
import TemplateLogo from "/TemplateLogo.png"


function Banner(){
    return(
        <div className="max-w-[100%] flex flex-wrap gap-20 p-5 bg-linear-to-b lg:bg-linear-to-r from-white to bg-gray-500 border-solid border-b-5 border-gray-600 mb-2">
            <img src={TemplateLogo} alt="" className="grow lg:grow-0"/>
            <h1 className="text-center text-[3em] tracking-widest self-center">Business Name Here</h1>
            <NavBar 
                text="text-xl lg:text-[2rem]"
            />
        </div>
    )
}

export default Banner;