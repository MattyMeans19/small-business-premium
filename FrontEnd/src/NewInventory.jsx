import React, {useState} from "react";
import TypeDropdown from "./TypeDropdown";
import BrandDropdown from "./BrandDropdown";

function NewInventory(props){
    const [newProductImage, changeNewProductImage] = useState(null)
    const [newName, changeNewName] = useState("");
    const [newInfo, changeNewInfo] = useState("");
    const [newPrice, changeNewPrice] = useState("");
    const [newSku, changeSku] = useState("");
    const [newType, changeType] = useState("");
    const [newBrand, changeBrand] = useState("");
    const [newStock, changeStock] = useState(0)

    function newImage(){
        let url = document.getElementById("url").value;
        changeNewProductImage(url);
    }
    function Name(){
       let newValue = document.getElementById("name").value
       changeNewName(newValue)     
    }
    function Info(){
       let newValue = document.getElementById("info").value;
       changeNewInfo(newValue)        
    }
    function Price(){
       let newValue = document.getElementById("price").value;
       changeNewPrice(newValue)         
    }
    function SKU(){
        let newValue = document.getElementById("sku").value;
        changeSku(newValue)         
     }
     function Type(t){
        let newValue = t;
        changeType(newValue)         
     }
     function Brand(b){
        let newValue = b;
        changeBrand(newValue)         
     }
     function Stock(){
        let newValue = document.getElementById("stock").value;
        changeStock(newValue)         
     }
    return(

        <div className="mb-[15%] flex flex-wrap self-center min-w-[80vw] border-5 bg-gray-500 justify-between p-2">
            <div className="basis-1/2 p-5 grow flex flex-col gap-5 justify-self-start max-w-[50%]">
                <label htmlFor="name">Product Name:</label>
                <input className="border-1 bg-white" id="name" onChange={Name} autoComplete="off"></input>
                <label htmlFor="info">Product Description: (Max length 55 characters)</label>
                <input className="border-1 bg-white" id="info" onChange={Info} maxLength="55" autoComplete="off"></input>
                <label htmlFor="price">Product Price:</label>
                <input className="border-1 bg-white" id="price" type="number" onChange={Price} autoComplete="off"></input>
                <label htmlFor="url">Product Image(URL):</label>
                <input className="border-1 bg-white" id="url" onChange={newImage} autoComplete="off"></input>
                <div className="flex text-center">
                    <TypeDropdown 
                        change={Type}
                    />
                    <BrandDropdown 
                        change={Brand}
                    />
                    <label htmlFor="sku" className="place-self-center">SKU: </label>
                    <input className="border-1 bg-white max-h-[50%] mx-5 place-self-center text-center" id="sku" onChange={SKU} maxLength="12" autoComplete="off"></input>
                    <label htmlFor="stock" className="place-self-center">Stock: </label>
                    <input className="border-1 bg-white max-h-[50%] max-w-[10%] mx-1 place-self-center text-center" id="stock" type="number" onChange={Stock} min="0" max="999" autoComplete="off"></input>
                </div>
                
            </div>
            <div className="basis-1/2 grow flex flex-col p-5">
                <h1 className="underline grow text-center">Your new image will be displayed here</h1>
                <img src={newProductImage} className="size-[25em] place-self-center"></img>
            </div>
            <div className="basis-1 grow flex flex-nowrap justify-center gap-2">
                <button className="grow max-w-[20%] border-3 p-2 bg-gray-300 rounded-3xl hover:bg-gray-500 active:bg-gray-700" onClick={() =>(props.onSave(newName, newInfo, newPrice, newProductImage, newType, newBrand, newSku, newStock))}> Save Item</button>
                <button className="grow max-w-[20%] border-3 p-2 bg-gray-300 rounded-3xl hover:bg-gray-500 active:bg-gray-700" onClick={() => (props.onCancel())}> Cancel</button>                        
            </div>
    </div>
    )
}

export default NewInventory;