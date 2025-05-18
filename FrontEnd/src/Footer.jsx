import React from "react";
import NavBar from "./NavBar";

function Footer(){
    const year = new Date().getFullYear();

    return(
        <div className="bg-white flex gap-2 max-w-[100%]">
            <h3 className="text-l lg:text-2xl place-self-end">©️{year} YourBusiness </h3>
            <NavBar 
                text="text-l lg:text-[2rem]"
            />
        </div>
    )
}

export default Footer;