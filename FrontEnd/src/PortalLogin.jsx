import React, { useState } from "react";

function PortalLogin(props){
    const [userName, changeUserName] = useState("");
    const [password, ChangePassword] = useState("");


    function editUserName(){
        let newUname = document.getElementById("username").value;
        changeUserName(newUname);
    }
    function editPassword(){
        let newPassword = document.getElementById("password").value;
        ChangePassword(newPassword);
    }
    return(
        <div className="grow border-5 border-double flex flex-col py-15 mr-5 items-center gap-20 bg-gray-600 basis-1/3 justify-center">
            <form className="ml-1">
                <input type="text" id="username" placeholder="Employee UserName" className="border-1 bg-white p-2 min-w-[99%]" onChange={() => (editUserName())} autoComplete="off"></input>
                <input type="password" id="password" placeholder="Password" autoComplete="off" className="border-1 bg-white p-2 min-w-[99%]" onChange={() => (editPassword())} onKeyDown={(e) =>{
                    if(e.key ==="Enter"){
                        props.login(userName, password)
                    }
                }}></input>
                <p className="text-sm text-center text-red-500 mt-2">**PASSWORD IS CASE SENSITIVE**</p>
            </form>
            <button className="border-solid border-3 px-20 bg-gray-300 hover:bg-gray-600 active:bg-gray-800 rounded-md"
            onClick={() =>(
                props.login(userName, password)
            )}>
                Login
            </button>
        </div> 
    )
}

export default PortalLogin;