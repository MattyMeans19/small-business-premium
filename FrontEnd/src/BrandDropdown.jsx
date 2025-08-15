import React, {useEffect, useState} from "react";
import axios from "axios";
import { BASE_URL } from "./constants";

function BrandDropdown(props){
    const[brands, changeBrands] = useState([]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/brands`);
            changeBrands(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }
    return(
        <div>
            <label htmlFor="brand" className="text-[1.5rem] ml-[5%] mb-1 text-nowrap">Brand:</label>
            <select name="brand" id="brand" className="max-w-[60%] bg-white rounded-2xl p-2 border-solid border-1 text-center ml-[5%]" onChange={() => (props.change(document.getElementById("brand").value))}>
                <option value=""></option>
                {brands.map((brand) =>(
                    <option value={brand.brandname} key={brand.id}>{brand.brandname}</option>
                ))}
            </select>
        </div>
    )
}

export default BrandDropdown;