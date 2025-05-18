import React, {useState} from "react";
import SaveIcon from '@mui/icons-material/Save';



function NewCategory(props){
    const [newName, changeNewName] = useState("");

    function changeTitle(){
        let newTitle = document.getElementById(props.id).value;
        changeNewName(newTitle);
    }

    function saveTitle(){
        props.onSave(newName);
        document.getElementById(props.id).value = "";
        changeNewName("");
    }

    return(
        <div className="basis-1/3 text-center">
            <h3 className="underline">Add {props.id}</h3>
            <input id={props.id} className="border-1 bg-white px-2" onChange={changeTitle} autoComplete="off"></input>
            <button className="active:text-green-500" onClick={() =>(saveTitle())} autoComplete="off"><SaveIcon /></button>
        </div>
    )
}

export default NewCategory;