import React, {useEffect, useState} from "react";
import axios from "axios";
import ConsoleNav from "./ConsoleNav";
import InventoryTable from "./InventoryTable";
import NewInventory from "./NewInventory";
import { useNavigate } from "react-router";
import NewCategory from "./NewCategory";
import { BASE_URL } from "./constants";

function Inventory(){

    const [inventory, SetInventory] = useState([]);
    const [currentUser, ChangeUser] = useState("");
    const [userRole, changeUserRole] = useState("");
    const [searchBy, ChangeSearchParam] = useState("");
    const [isAdding, ChangeAdding] = useState(false)


    let navigate = useNavigate();

    useEffect(() => {
        fetchInventory();
        fetchUser();
    }, []);

    const fetchInventory = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/inventory`);
            SetInventory(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    
    const fetchUser = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/user`);
            if(response.data.currentUser != ""){
                ChangeUser(response.data.currentUser);
                changeUserRole(response.data.currentRole);
            } else{
                navigate("/business-portal")
            }
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }

    function newSearch(){
        let newSearchParam = document.getElementById("search").value;
        if(newSearchParam !=""){
            ChangeSearchParam(newSearchParam);
        } else{
            ChangeSearchParam("")
            fetchInventory();
        }
    }

    const SearchItem = async () => {
        try{
            const response = await axios.post(`${BASE_URL}/search`, {name: searchBy})
            if(response.data != ""){
               SetInventory(response.data); 
            } else{
                alert("No Match Found!")
                document.getElementById("search").value = "";
            }   
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }

    function AddingNew(){
        ChangeAdding(true);
    }
    function CancelAdding(){
        ChangeAdding(false);
    }

    function CheckSaveData(n, i, p, url, t, b, sku, stock){
        if( n!="" && i!="" && p!="" && url!="" && t!="" && b!="" && sku!=""){
            SaveItem(n, i, p, url, t, b, sku, stock);
        } else {
            console.log("Empty Entries are NOT ALLOWED");
            alert("Empty Entries are NOT ALLOWED");
        }
    }

    const SaveItem = async (n, i, p, url, t, b, sku, stock) => {
        try{
            const response = await axios.post(`${BASE_URL}/additem`, {name: n, info: i, price: p, image: url, type: t, brand: b, sku: sku, stock: stock});
            alert("Item Added!");
            fetchInventory();
            ChangeAdding(false);
        } catch (error){
            console.error('Error fetching User:', error);
        }
    }

    function CheckBrand(brand){
        if( brand !==""){
            NewBrand(brand);
        } else {
            console.log("Empty Entries are NOT ALLOWED");
            alert("Empty Entries are NOT ALLOWED");
        }
    }

    const NewBrand = async(brand) => {
        try{
            const response = await axios.post(`${BASE_URL}/newBrand`, {brand: brand})
            alert("New Brand Added!");
        } catch (error){
            console.error('Error Adding Brand:', error);
        }
    }

    function CheckType(type){
        if( type !==""){
            NewType(type);
        } else {
            console.log("Empty Entries are NOT ALLOWED");
            alert("Empty Entries are NOT ALLOWED");
        }
    }

    const NewType = async(type) => {
        try{
            const response = await axios.post(`${BASE_URL}/newType`, {type: type})
            alert("New Type Added!");
        } catch (error){
            console.error('Error Adding Type:', error);
        }
    }

    return(
        <div>
            <div className="flex flex-col gap-10 max-w-screen">
                <ConsoleNav 
                    inventory="../inventory"
                    message="../dailymessage"
                    admin="../admin"
                    dashboard="../orders"
                    visible="visible"
                    currentUser = {currentUser}
                    userRole = {userRole}
                />
                <h1 className="mt-10 pb-10 text-center text-7xl border-double border-b-10 rounded-b-2xl grow">Inventory</h1>
                <h2 className="text-[1.5rem] mt-2 s:visible md:invisible text-center">*If viewing on Mobile Phone, rotate screen for best view*</h2>

                {isAdding 
                ? 
                <NewInventory 
                    onCancel={CancelAdding}
                    onSave={CheckSaveData}
                /> 
                :
                <div className="flex flex-col gap-10 mb-[10%]">
                    <div className="flex flex-wrap justify-around border-double border-3 mx-[25%] p-10 rounded-3xl bg-gray-700 gap-5">
                        <div className="basis-1/3 text-center">
                            <input id="search" className="border-solid border-1 bg-white rounded-2xl p-2" placeholder="Search By Name or SKU" onChange={newSearch} autoComplete="off"></input>
                            <button className="border-1 rounded-full bg-gray-300 hover:bg-gray-500 active:bg-gray-700 px-5" onClick={SearchItem}>Search</button>   
                        </div>
                        <div className="basis-1/3 text-center">
                            <button className="border-solid border-1 bg-gray-300 hover:bg-gray-500 active:bg-gray-700 rounded-2xl p-2" onClick={AddingNew} autoComplete="off">Add New Product</button>
                        </div>
                        <NewCategory 
                            id="Brand"
                            onSave={CheckBrand}
                        />
                        <NewCategory 
                            id="Type"
                            onSave={CheckType}
                        />
                    </div>

            
                    <div className="border-double border-10 grow p-5 bg-gray-600 w-[95vw] self-center grid grid-cols-5 gap-5 pb-5">
            
                        {inventory.map((item) =>(
                            <InventoryTable
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                type={item.type}
                                price={item.price}
                                info={item.info}
                                image={item.image}
                                stock ={item.stock}
                                sku={item.sku}
                                brand={item.brand}
                                refresh={fetchInventory}
                            />
                        ))}
                    </div>
                </div> }
            </div>
        </div>

    )
}

export default Inventory;