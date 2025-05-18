import React, {useState} from "react";
import TypeDropdown from "./TypeDropdown";
import BrandDropdown from "./BrandDropdown";


function ProductFilters(props){
    const [sortType, changeSortType] = useState("");
    const [sortBrand, changeSortBrand] = useState("");

    function onTypeChange(t){
        let newType = t;
        changeSortType(newType);
    }

    function onBrandChange(b){
        let newBrand = b;
        changeSortBrand(newBrand);
    }


    return(
        <div className="border-solid border-3 border-gray-600 bg-gray-200 col-start-1 col-span-full top-[45%] lg:fixed lg:col-start-1 lg:col-span-2 mx-5 flex flex-wrap lg:flex-wrap lg:flex-col lg:w-[20%] rounded-xl pb-2 gap-4">
            <div className="basis-1/3 lg:basis-0">
                <TypeDropdown 
                    change={onTypeChange}
                />
            </div>

            <div className="basis-1/4 lg:basis-0">
                <BrandDropdown 
                    change={onBrandChange}
                />
            </div>

            <div className="basis-1/4 lg:basis-0">
                <label htmlFor="sortby" className="text-[1.5rem] ml-[5%] mb-1">Sort</label>
                <select name="sortby" id="sortby" className="max-w-[70%] bg-white rounded-2xl p-2 border-solid border-1 text-center ml-[5%]">
                    <option value="id"></option>
                    <option value="price DESC">Price: High to Low</option>
                    <option value="price ASC">Price: Low to High</option>
                    <option value="name">Alphabetical</option>
                </select>
            </div>
            <div className="basis-full mx-3 text-center">
                <button className="border-solid min-w-[80%] border-3 rounded-2xl border-gray-700 bg-blue-100 hover:bg-gray-300 active:bg-gray-700 text-2xl p-2"
                onClick={() =>(
                    props.filtered(sortType, document.getElementById("sortby").value, sortBrand)
                )}>
                    Filter  
                </button>
            </div>

        </div>
    )
}

export default ProductFilters;