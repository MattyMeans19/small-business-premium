import React, {useState, useEffect, useActionState} from "react";
import axios from "axios";
import ConsoleNav from "./ConsoleNav";
import UsersTable from "./UsersTable";
import { useNavigate } from "react-router";
import AddUser from "./AddUser";
import { BASE_URL } from "./constants";

function Admin(){
    const [currentUser, ChangeUser] = useState("");
    const [userRole, changeUserRole] = useState("");
    const [canAccess, changeAccess] = useState(true);
    const [userList, changeList] = useState([]);

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

    function ManageAccess(role){
        if(role != "Admin"){
            changeAccess(false);
            fetchUserList()
        } else {
            changeAccess(true);
            fetchAdminList()
        }
    }

    function onEditSelf(u){
        ChangeUser(u);
    }

    const fetchUserList = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/userList`);
            changeList(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }
    const fetchAdminList = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/adminList`);
            changeList(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }
    
    return(
        <div>
            <ConsoleNav 
                inventory="../inventory"
                message="../dailymessage"
                admin="../admin"
                dashboard="../orders"
                visible="visible"
                currentUser = {currentUser}
                userRole = {userRole}
            />
            <h1 className="mt-10 pb-10 text-center text-7xl border-double border-b-10 rounded-b-2xl">Admin Tools</h1>
            {canAccess ?
                        <div className="border-2 rounded-3xl bg-gray-300 m-[5%]">
                            <h1 className="text-center underline text-3xl mb-5">'New/Edit User' Guide</h1>
                            <ul className="p-10 list-disc ml-[10%] text-2xl">
                                <li>No entries can be blank when creating a new user. An alert will inform you if any entries are blank and user will NOT be saved.</li>
                                <li>Entries can be whatever you want, passwords are not restricted to specific keys, ARE case-sensitve, and must be at least 6 characters long.</li>
                                <li>Roles determine what pages of the Business Portal a user can access. They are as follows:</li>
                                <ol className="p-10 list-disc ml-[5%]">
                                    <li>Employee: Access to Inventory, Restricted from access to Daily Message, Access to Admin Tools is limited to own info.</li>
                                    <li>Manager: Access to Inventory, Access to Daily Message, Access to Admin Tools is limited to own info.</li>
                                    <li>Admin: Access to Inventory, Access to Daily Message, Access to full Admin Tools.</li>
                                </ol>
                            </ul>
                            <AddUser onSave={() => (fetchUser())}/>
                        </div>
            : null}

            <div className="bg-gray-500 border-2 border-b-5 grid grid-cols-7 gap-5 mx-5 mt-5 px-2 pt-2">
                    <span className="col-span-1 text-white text-2xl border-x-1 border-t-1 text-center">First Name</span>
                    <span className="col-span-1 text-white text-2xl border-x-1 border-t-1 text-center">Last Name</span>
                    <span className="col-span-1 text-white text-2xl border-x-1 border-t-1 text-center">User Name</span>
                    <span className="col-span-1 text-white text-2xl border-x-1 border-t-1 text-center">Password</span>
                    <span className="col-span-1 text-white text-2xl border-x-1 border-t-1 text-center">Role</span>
                </div>
                <div className="mb-20">
                    {userList.map((user) =>(
                        <UsersTable 
                            key= {user.id}
                            id= {user.id}
                            firstName= {user.firstname}
                            lastName= {user.lastname}
                            userName= {user.username}
                            password= {user.password}
                            role= {user.role}
                            refresh={fetchUser}
                            canDelete={canAccess}
                            currentUser={currentUser}
                            onSelfEdit={onEditSelf}
                        />       
                        ))}           
                </div>
        </div>

    )
}

export default Admin;