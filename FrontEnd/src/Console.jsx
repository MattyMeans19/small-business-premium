import React, {useState} from "react";
import axios from 'axios';
import ConsoleNav from "./ConsoleNav";
import PortalBanner from "./PortalBanner";
import PortalLogin from "./PortalLogin";

function Console(){
    const [isLoggedIn, ChangeStatus] = useState(false);
    const [currentUser, changeUser] = useState("");

    function Submit(username, password){
        if(username != "" && password != ""){
            Login(username, password);
        } else{
            alert("Fields cannot be blank!");
        }
    }

    const Login = async (u, p) => {
        try{
            const response = await axios.post('http://localhost:3000/login', {user : u, password : p});
            if(response.data != "Incorrect Username or Password!"){
                ChangeStatus(true);
                changeUser(u);
            } else{
                alert("Incorrect Username or Password!");
            }
        } catch (error){
            console.error('Error Logging In:', error);
            alert("User Not Found!");
        }
    }

    return(
        <div>
            {isLoggedIn ?     
            <div>
                <ConsoleNav 
                inventory="inventory"
                message="dailymessage"
                admin="admin"
                dashboard="orders"
                visible="invisible"
                currentUser={currentUser}
                userRole=""
                />
                <div className="mt-50 border-double border-6 mx-[30%] bg-gray-300 rounded-2xl">
                    <h2 className="text-4xl text-center">Welcome, {currentUser.toUpperCase()}.</h2>
                    <h3 className="text-center">Select an option to get started!</h3>
                </div>

            </div> :
            <div className="flex flex-wrap gap-50 border-double border-5 max-w-[100vw] min-w-[75vw] bg-gray-400 absolute top-[25%] bottom-[25%] left-[15%] right-[25%] py-10">
            <PortalBanner />
            <PortalLogin
                login={Submit}
                onKeyDown={Submit}
            />
            </div>
            }
        </div>

    )
}

export default Console;