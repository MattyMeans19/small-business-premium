import React, {useState, useEffect} from "react";
import axios from "axios";
import ConsoleNav from "./ConsoleNav";
import { useNavigate } from "react-router";
import { BASE_URL } from "./constants";

function DailyMessage(){
        const [currentUser, ChangeUser] = useState("");
        const [userRole, changeUserRole] = useState("");
        const [canAccess, changeAccess] = useState(true);
        const [message, changeMessage] = useState("")

        let navigate = useNavigate();

        useEffect(() => {
            fetchUser();
        }, []);

        const fetchUser = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/user`);
            if(response.data.currentUser != ""){
                ChangeUser(response.data.currentUser);
                changeUserRole(response.data.currentRole);
                ManageAccess(response.data.currentRole);
            } else{
                navigate("/business-portal")
            }
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }

    const saveMessage = async (message) => {
        try{
            const response = await axios.post(`${BASE_URL}/updatemessage`, {message: message});
            if(response.data !=""){
                alert("Daily Message Changed!");
                document.getElementById("dailyMessage").value="";
            } else{
                alert("Daily Message can't be blank");
            }
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }

    function editMessage(){
        let newMessage = document.getElementById("dailyMessage").value;
        changeMessage(newMessage);
    }

    function ManageAccess(role){
        if(role != "Employee"){
            changeAccess(true);
        } else {
            changeAccess(false);
        }
    }

    return(
        <div className="max-w-screen">
            <ConsoleNav
                inventory="../inventory"
                message="../dailymessage"
                admin="../admin"
                dashboard="../orders"
                visible="visible"
                currentUser = {currentUser}
                userRole = {userRole}       
            />
            {canAccess ? 
                <div>
                    <h1 className="mt-10 pb-10 text-center text-7xl border-double border-b-10 rounded-b-2xl">Daily Message</h1>

                    <div className="place-self-center flex flex-col place-items-center mt-10 bg-gray-300 min-w-[90vw] min-h-[30vw] rounded-3xl gap-5">
                        <h2 className="mt-10 pb-10 text-center text-4xl underline">Input a new daily message for your landing page!</h2>
                        <textarea className=" grow border-3 px-10 min-w-[70vw] max-h-[25vh] bg-white rounded-3xl text-4xl pt-2" maxLength="255" id="dailyMessage" onChange={() =>(editMessage())}></textarea>
                        <button className="border-3 min-w-[10%] bg-gray-500 hover:bg-gray-700 active:bg-gray-900" onClick={() =>(saveMessage(message))}>Save</button>
                    </div>
                </div> :
                <div className="self-center text-7xl border-3 bg-red-600 text-center mt-15">
                    <h1>Sorry, you do not have access to these tools.</h1>
                </div>}
        </div>


    )
}

export default DailyMessage;