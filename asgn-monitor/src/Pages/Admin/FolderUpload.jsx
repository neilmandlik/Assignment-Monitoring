import { useState } from "react"
import { postFile } from "../../CRUDdata"
import { useNavigate } from "react-router-dom"

function FolderUpload(){
    
    const navigate=useNavigate()
    const[folder,setFolder]=useState()

    const handleFolderUpload=(event)=>{
        const filesArray=Array.from(event.target.files)
        setFolder(filesArray)
    }

    const handleUploadClick=async()=>{
        const formDataObj={
            objId: 3,
            paths: folder.map(file=>file.webkitRelativePath),
            'files': folder,
        }

        const edited=await postFile(formDataObj,`http://localhost:3002/api/json/uploadfolder`)
        if(edited.status===200){
            navigate(`../registration`)
        }
    }

    return(
        <>
            <div className="upload-folder-screen">
                <p>Upload Assignment Question Folder: <input type="file" webkitdirectory="true" multiple="true" onChange={handleFolderUpload}/></p>
                <button className="upload-buttons" onClick={handleUploadClick}>Upload</button>
            </div>
        </>
    )
}

export default FolderUpload