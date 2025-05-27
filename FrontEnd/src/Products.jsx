import React, {useEffect, useState} from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import ProductFilters from "./ProdcutFilters";
import ProductCard from "./ProductCard";
import axios from 'axios';
import AddToCart from "./AddToCart";

function Products(){
    const [inventory, SetInventory] = useState([]);
    const [addView, changeAddView] = useState(false);
    const [viewInfo, changeViewInfo] = useState({name: null, brand: null, sku: null, image: null, info: null, price: null, stock: null});


    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try{
            const response = await axios.get('http://localhost:3000/inventory');
            SetInventory(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    function addFilter(type, sort, brand){
        if(type !== "" || brand !== ""){
            console.log(type, sort, brand);
            filter(type, sort, brand);
        }
        else if(type ==="" && brand ==="" && sort !=="" ){
            sortBy(sort);
        } 
        else if(type==="" && sort==="" && brand ===""){
            fetchInventory();
        }
    }

    const filter = async (t, p, b) => {
        console.log("filtering...")
        try{
            const response = await axios.post('http://localhost:3000/filter', {type : t, sort : p, brand: b});
            SetInventory(response.data)
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    const sortBy = async (p) => {
        console.log("sorting...")
        try{
            const response = await axios.post('http://localhost:3000/sort', {sort : p});
            SetInventory(response.data)
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    function CloseAddView(){
        changeAddView(false);
    }
    function CartWindow(n, b, sku, url, i, p, s){
        changeViewInfo({
            name: n, 
            brand: b, 
            sku: sku,
            image: url,
            info: i,
            price: p,
            stock: s
        });
        changeAddView(true);
    }

    return(
        <div className="flex flex-col max-w-[100%] min-h-screen max-h-full">
            <Banner />
            <div className="grow grid grid-cols-9 my-2">
                <ProductFilters 
                    filtered = {addFilter}
                />
                <div className="border-solid border-3 border-gray-600 bg-gray-300 col-start-1 col-span-full row-start-2 row-span-9 lg:col-start-3 lg:col-span-8 lg:row-start-1 lg:row-span-9 lg:mr-5 my-5 lg:my-0 rounded-xl flex flex-wrap gap-5 px-[5%] pb-5">
                    <p className="text-center text-[1.5rem] p-2 text-red-500 basis-full"> Discounts are not reflected on product card!</p>
                    {inventory.map((item) =>(
                        <ProductCard 
                            key={item.id}
                            name={item.name}
                            info={item.info}
                            price={item.price}
                            img={item.image}
                            stock = {item.stock}
                            sku={item.sku}
                            brand={item.brand}
                            onAdd={CartWindow}
                        />
                    ))}
                    <AddToCart 
                        visiblilty={addView}
                        onClose={CloseAddView}
                        productInfo={viewInfo}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Products;