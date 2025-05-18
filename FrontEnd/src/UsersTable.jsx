import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

function UsersTable(props){
    const [editingMode, changeEditingMode] = useState(false);
    const [fName, newFName] = useState(props.firstName);
    const [lName, newLName] = useState(props.lastName);
    const [uName, newUName] = useState(props.userName);
    const [password, updatePassword] = useState(props.password);
    const [role, newRole] = useState(props.role);
    const [canDelete, changeDelete] = useState(props.canDelete);

    function toggleEdit(){
        changeEditingMode(!editingMode);
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
        newUName(uName.toUpperCase());
    }
    function changePassword(){
        let newPassword = document.getElementById("newPassword").value;
        updatePassword(newPassword);
    }
    function changeRole(){
        let changedRole = document.getElementById("newRole").value;
        newRole(changedRole);
    }

    function savedInfo(id, f, l, u, p, r){
        if(p.length > 5){
            saveEdit(id, f, l, u, p, r);
        } else{
            alert("Password must be at least 6 characters!");
        }
        
    }

    const saveEdit = async (id, f, l, u, p, r) => {
        try{
            const response = await axios.post('http://localhost:3000/saveEdit', {id: id, fname: f, lname: l, uname: u, password: p, role: r});
            props.refresh();
            toggleEdit();
            alert("User Info Updated!")
        } catch (error){
            console.error('Error Saving Edit:', error);
        }
    }
    const deleteUser = async (id) => {
        let currentUser = props.currentUser.toUpperCase();

        if(canDelete && currentUser != uName){
            try{
                const response = await axios.post('http://localhost:3000/deleteUser', {id: id});
                alert("User Deleted")
                props.refresh();
            } catch (error){
                console.error('Error Deleting User:', error);
            }           
        } else{
            if(currentUser != uName){
                alert("Users can only be deleted by Admins!") 
            } else{
                alert("Cannot Delete Self!")
            }
        }

    }

    return(
        <div>
            {editingMode ?
            <div className="bg-gray-100 border-3 grid grid-cols-7 gap-5 mx-5 p-2">
                <input className="col-span-1 text-2xl border-1 text-center" placeholder={props.firstName} id="newFName" onChange={() => (changeFName())} autoComplete="off"></input>
                <input className="col-span-1 text-2xl border-1 text-center" placeholder={props.lastName} id="newLName" onChange={() => (changeLName())} autoComplete="off"></input>
                <span className="col-span-1 text-2xl border-1 text-center" id="newUName">{props.userName}</span>
                <input className="col-span-1 text-2xl border-1 text-center" placeholder={props.password} id="newPassword" onChange={() => (changePassword())} autoComplete="off"></input>
                {canDelete ?
                <select className="col-span-1 text-2xl border-1 text-center" defaultValue={props.role} id="newRole" onChange={() => (changeRole())}>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select> :
                <span className="col-span-1 text-2xl border-1 text-center">{props.role}</span>
                 }

                <button className="col-span-1 text-2xl border-r-2 text-center hover:bg-blue-300" onClick={() => (savedInfo(props.id, fName, lName, uName, password, role))}>Save <SaveIcon /></button>
                <button className="col-span-1 text-2xl border-l-2 text-center hover:bg-blue-300" onClick={() => (toggleEdit())}>Cancel <CancelIcon /></button>
            </div> :
            <div className="bg-gray-100 border-3 grid grid-cols-7 gap-5 mx-5 p-2">
                <span className="col-span-1 text-2xl border-1 text-center">{props.firstName}</span>
                <span className="col-span-1 text-2xl border-1 text-center">{props.lastName}</span>
                <span className="col-span-1 text-2xl border-1 text-center">{props.userName}</span>
                <span className="col-span-1 text-2xl border-1 text-center">{props.password}</span>
                <span className="col-span-1 text-2xl border-1 text-center">{props.role}</span>
                <button className="col-span-1 text-2xl border-r-2 text-center hover:bg-blue-300" onClick={() => (toggleEdit())}>Edit <EditIcon /></button>
                <button className="col-span-1 text-2xl border-l-2 text-center hover:bg-blue-300" onClick={() => (deleteUser(props.id))}>Delete <DeleteForeverIcon /></button>
        </div>}
        </div>
    )
}

export default UsersTable;