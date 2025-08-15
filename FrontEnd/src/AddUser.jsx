import React, {useState} from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import { BASE_URL } from "./constants";

function AddUser(props){
    const [adding, toggleAdding] = useState(false);
    const [fName, newFName] = useState("");
    const [lName, newLName] = useState("");
    const [uName, newUName] = useState("");
    const [password, updatePassword] = useState("");
    const [role, newRole] = useState("Employee");

    function addMode(){
        toggleAdding(!adding);
    }

    function changeFName(){
        let fName = document.getElementById("newFName").value;
        newFName(fName);
    }
    function changeLName(){
        let lName = document.getElementById("newLName").value;
        newLName(lName);
    }
    function changeUName(){
        let uName = document.getElementById("newUName").value;
        newUName(uName);
    }
    function changePassword(){
        let newPassword = document.getElementById("newPassword").value;
        updatePassword(newPassword);
    }
    function changeRole(){
        let changedRole = document.getElementById("newRole").value;
        newRole(changedRole);
    }
    
    function savedInfo(f, l, u, p, r){
        if(f != "" && l != "" && u != "" && p != "" && p.length > 5){
            saveUser(f, l, u, p, r)
        } else {
            if(p.length > 5){
                alert("No Blank entries allowed!");
            } else {
                alert("Password must be at least 6 characters!");
            }
        }

    }

    const saveUser = async (f, l, u, p, r) => {
        try{
            const response = await axios.post(`${BASE_URL}/addUser`, {fname: f, lname: l, uname: u, password: p, role: r});
            props.onSave();
            addMode();
            alert("New User Created!")
            clearEntries();
        } catch (error){
            console.error('Error Saving Edit:', error);
        }
    }

    function clearEntries(){
        newFName("");
        newLName("");
        newUName("");
        updatePassword("");
        newRole("Employee");
    }

    return(
        <div>
            {adding ?        
            <div className="bg-gray-100 border-3 grid grid-cols-7 gap-5 mx-5 p-2 mb-5">
                <input className="col-span-1 text-2xl border-1 text-center" placeholder="First Name" id="newFName" onChange={() => (changeFName())} required autoComplete="off"></input>
                <input className="col-span-1 text-2xl border-1 text-center" placeholder="Last Name" id="newLName" onChange={() => (changeLName())} required autoComplete="off"></input>
                <input className="col-span-1 text-2xl border-1 text-center" placeholder="User Name" id="newUName" onChange={() => (changeUName())} required autoComplete="off"></input>
                <input className="col-span-1 text-2xl border-1 text-center" placeholder="Password" id="newPassword" onChange={() => (changePassword())} required autoComplete="off"></input>
                <select className="col-span-1 text-2xl border-1 text-center" defaultValue="Employee" id="newRole" onChange={() => (changeRole())}>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                <button className="col-span-1 text-2xl border-r-2 text-center hover:bg-blue-300" onClick={() => (savedInfo(fName, lName, uName, password, role))}>Save <SaveIcon /></button>
                <button className="col-span-1 text-2xl border-l-2 text-center hover:bg-blue-300" onClick={() => (addMode())}>Cancel <CancelIcon /></button>
            </div> :
            <button className="max-w-[100%] min-w-[33.33%] ml-[33.33%] text-4xl border-2 rounded-full bg-gray-500 hover:bg-gray-700 active:bg-gray-900 mb-5" onClick={() => (addMode())}>Add User</button>}
        </div>

    )
}

export default AddUser;