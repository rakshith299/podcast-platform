import React, {useState} from "react";
import ReactDom from "react-dom";
import "./styles.css"

const FileInput = ({accept, id, fileHandleFunc, text}) => {
    const [fileSelected, setFileSelected] = useState(false);
    const [fileName, setFileName] = useState(false);

    function handleFileSelect(e){
        
        setFileSelected(true);
        setFileName(e.target.files[0].name)
        fileHandleFunc(e.target.files[0])
    }

    return (
        <div>
            <div> 
                <label htmlFor={id} className={`custom-file-input ${fileSelected ? "active" : "grey-placeholder"}`} >{fileSelected ? `(${fileName}) File is selected` : `${text}`}</label>
                <input type = "file" accept= {accept} id = {id}  style={{display: "none"}} onChange= {handleFileSelect}/>
            </div>
        </div>
    )
}

export default FileInput;