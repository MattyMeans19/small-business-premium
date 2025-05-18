import React, {useEffect, useState} from "react";
import axios from "axios";

function TypeDropdown(props){
    const[types, changeTypes] = useState([]);

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try{
            const response = await axios.get('http://localhost:3000/types');
            changeTypes(response.data);
        } catch (error){
            console.error('Error fetching inventory:', error);
        }
    }

    return(
        <div>
            <label htmlFor="types" className="text-[1.5rem] ml-[5%] mb-1 text-nowrap">Product Type:</label>
            <select name="types" id="types" className="max-w-[60%] bg-white rounded-2xl p-2 border-solid border-1 text-center ml-[5%]" onChange={() => (props.change(document.getElementById("types").value))}>
                <option value=""></option>
                {types.map((type) =>(
                    <option value={type.typecategory} key={type.id}>{type.typecategory}</option>
                ))}
            </select>
        </div>
    )
}

export default TypeDropdown;