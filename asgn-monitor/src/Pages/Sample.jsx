import React, {useEffect, useState} from "react"
import { deleteData, postFile } from "../CRUDdata"
function Sample(){
    const[file1,setFile]=useState("")
    const [file2,setFile2]=useState()
    const [folder,setFolder]=useState()

    useEffect(()=>{
        console.log(file2)
    },[file2])

    useEffect(()=>{
        console.log(folder)
        if(folder!==undefined){
            folder.forEach(file=>{
                // console.log(file.webkitRelativePath)
                // console.log(file)
            })
        }
    },[folder])

    // const handleFileDownload=(event)=>{
    //     setFile(event.target.files[0])
    // }

    const handleDeleteFile=async()=>{
        console.log(file2.name)
        const edited=await deleteData(`http://localhost:3002/api/json/deletefile/${file2.name}`)
        console.log(edited.message)
    }

    const handleFile2Download=(event)=>{
        setFile2(event.target.files[0])
    }

    const handleFolderChange=(event)=>{
        const filesArray=Array.from(event.target.files)
        setFolder(filesArray)
    }

    const uploadFile=async()=>{
        // if(!file1 && !file2){
        //     alert("Please Select a File")
        // }
        // else if(!file1 && file2){
        //     console.log("Hi")
        //     const formDataObj={
        //         "file": file2
        //     }

        //     const edited =await postFile(formDataObj,"http://localhost:3002/api/json/uploadfile")
        //     console.log(edited.message)
        // }
        // else{
        //     const formDataObj={
        //         "files": [file1,file2]
        //     }

        //     const edited=await postFile(formDataObj,"http://localhost:3002/api/json/uploadfile")
        //     console.log(edited?.message)
        // }

        let formDataObj={
            paths: folder.map(file=> file.webkitRelativePath),
            "files": folder
        }

        const edited=await postFile(formDataObj,"http://localhost:3002/api/json/uploadfolder")
        console.log(edited?.message)
    }
    return(
        <>
            {/* <input onChange={handleFileDownload} type="file"/> */}
            <input 
                type="file"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFolderChange}
            />
            {/* <input onChange={handleFile2Download} type="file"/> */}
            <button onClick={uploadFile}>Upload</button>
            <a href={`/Semester 5 fees 2.pdf`} target="_blank">View File</a> <br />
            <button onClick={handleDeleteFile}>Delete file</button>     <br />
            {/* <iframe src={`/Semester 5 fees 2.pdf`}  width="100%" height="600px"></iframe>             */}
        </>
    )
}

export default Sample