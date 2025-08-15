import React, {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import TypeDropdown from "./TypeDropdown";
import BrandDropdown from "./BrandDropdown";
import axios from "axios";
import { BASE_URL } from "./constants";


function InventoryTable(props){

    const [isEditing, toggleEdit] = useState(false);
    const [newName, changeName] = useState(props.name);
    const [newImage, changeImage] = useState(props.image);
    const [newInfo, changeInfo] = useState(props.info);
    const [newPrice, changePrice] = useState(props.price);
    const [newType, changeType] = useState(props.type);
    const [newStock, changeStock] = useState(props.stock);
    const [newSku, changeSku] = useState(props.sku);
    const [newBrand, changeBrand] = useState(props.brand);

    function editing(){
       if(isEditing){
        toggleEdit(false)
       } else{
        toggleEdit(true)
        changeImage(props.image)
       }
    }

    function editName(){
        changeName(document.getElementById("name").value)
    }
    function editImageURL(){
        changeImage(document.getElementById("imageURL").value)
    }
    function editInfo(){
        changeInfo(document.getElementById("info").value)
    }
    function editPrice(){
        changePrice(document.getElementById("price").value)
    }
    function editType(t){
        changeType(t)
    }
    function editSku(){
        changeSku(document.getElementById("sku").value)
    }
    function editStock(){
        changeStock(document.getElementById("stock").value)
    }
    function editBrand(b){
        changeBrand(b)
    }

    function saveChanges(){
        saveToDB(props.id, newName, newInfo, newPrice, newType, newImage, newStock, newSku, newBrand)
        toggleEdit(false)
    }

    const saveToDB = async(id, name, info, price, type, image, stock, sku, brand) => {
        console.log("saving...")
        try{
            await axios.post(`${BASE_URL}/editItem`, {name: name, info: info, price: price, image: image, id: id, type: type, stock: stock, sku: sku, brand: brand});
            props.refresh();
        } catch (error){
            console.error('Error saving inventory:', error);
        }
    }

    const deleteItem = async(id) => {
        try{
            const response = await axios.post(`${BASE_URL}/removeItem`, {id: id});
            alert("Item Deleted!");
            props.refresh();
        } catch (error){
            console.error('Error saving inventory:', error);
        }
    }

    

    return(
        <div>
            {isEditing 
            ? 
            <div>
                <form className="col-span-1 h-[100%] border-double border-5 border-gray-400 bg-white p-5 rounded-3xl flex flex-col gap-4">
                    <div className="flex flex-nowrap px-10 justify-center">
                        <button type="button" className="hover:bg-blue-500 rounded-full" onClick={() =>{saveChanges()}}><SaveIcon /></button>
                       <input type="text" id="name" placeholder="Product Name" className="text-center text-2xl underline" onChange={() =>{editName()}}></input>
                       <button type="button" className="hover:bg-blue-500 rounded-full" onClick={() =>{editing()}}><CancelIcon /></button>
                    </div>
                    <input type="text" id="sku" placeholder="Product Number" className="text-center border-1" onChange={() =>{editSku()}}></input>
                    <TypeDropdown 
                        change={editType}
                    />
                    <BrandDropdown 
                        change={editBrand}
                    />
                    <input type="text" id="imageURL" placeholder="insert image URL here" className="grow border-1" onChange={() =>{editImageURL()}}></input>
                    <img src= {newImage} className="w-[15rem] h-[15rem] self-center border-solid border-2 rounded-xl"></img>
                    <input type="text" id="info" placeholder="Enter product info here" className="grow border-1 italic" onChange={() =>{editInfo()}} maxLength="20"></input>
                    <input type="number" id="stock" placeholder={[`Stock Amount : ${props.stock}`]} className="text-center border-1" onChange={() =>{editStock()}}></input>
                    <input type="text" id="price" placeholder="Enter the price here, do NOT include the $" className="border-1" onChange={() =>{editPrice()}}></input>
                </form>
            </div> 
            :
            <div className="col-span-1 h-[100%] border-double border-5 border-gray-400 bg-white p-5 rounded-3xl flex flex-col gap-4">
                <div className="basis-1/10 flex justify-between">
                    <button className="hover:bg-blue-500 rounded-full" onClick={() =>{editing()}}><EditIcon /></button>
                    <h3 className="text-center text-2xl underline">{props.name}</h3>
                    <button className="hover:bg-blue-400 rounded-full" onClick={() =>(deleteItem(props.id))}><DeleteForeverIcon /></button>
                </div>
                <span className="self-center">{props.brand}</span>
                <span className="self-center">Item#: {props.sku}</span>
                <p className="italic text-center">{props.type}</p>
                <img src= {props.image} className="w-[15rem] h-[15rem] self-center border-solid border-2 rounded-xl"></img>
                <p className="italic w-auto grow">{props.info}</p>
                <span className="self-end">Stock: {props.stock}</span>
                <span className="self-end text-[1.5rem] border-2 p-2 rounded-full bg-gray-100">${props.price}</span>
            </div>
            }
        </div>
    )
}

export default InventoryTable;