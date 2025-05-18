import React from "react";

function TextBox(props){
    return(
        <div className={[`border-double border-5 border-black mx-[5%] p-5 bg-gray-300 ${props.text} ${props.grid}`]}>
            <p>{props.content}</p>
        </div>
    )
}

export default TextBox;