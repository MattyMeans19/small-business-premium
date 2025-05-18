import React from "react";
import TemplateLogo from "/TemplateLogo.png"

function PortalBanner(){
    return(
        <div className="grow content-center pl-[15%] basis-1/3">
            <img src={TemplateLogo} alt="" className="grow lg:grow-0"/>
            <h1 className="text-3xl">Business Portal</h1>
        </div>
    )
}

export default PortalBanner;