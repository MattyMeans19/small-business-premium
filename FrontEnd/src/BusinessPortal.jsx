import React, {useEffect, useState} from "react";
import { Outlet } from "react-router";
import Console from "./Console";

function BusinessPortal(){


    return(
        <div>
            <Console />
            <Outlet />
        </div>

    )
}

export default BusinessPortal;