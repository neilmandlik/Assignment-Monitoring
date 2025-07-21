import { useState } from "react"
import { postFile } from "../../CRUDdata"
import { useNavigate } from "react-router-dom"

function SemesterRegistration(){
    const navigate=useNavigate()
    const [facultyFile,setFacFile]=useState()
    const [studentFile,setStudFile]=useState()
    const [subjectFile,setSubFile]=useState()
    const [classFile,setClsFile]=useState()
    const [mergefile,setMrgFile]=useState()

    const handleFacultyFileChange=(e)=>setFacFile(e.target.files[0])
    const handleClassFileChange=(e)=>setClsFile(e.target.files[0])
    const handleSubjectFileChange=(e)=>setSubFile(e.target.files[0])
    const handleMergeFileChange=(e)=>setMrgFile(e.target.files[0])
    const handleStudentFileChange=(e)=>setStudFile(e.target.files[0])

    const handleFileUpload=async()=>{
        const formDataObj={
            objId: 2,
            "files":[facultyFile,,classFile,subjectFile,mergefile,studentFile]
        }

        const edited=await postFile(formDataObj,"http://localhost:3002/api/json/semeterregistrationassociations")
        console.log(typeof(edited.status))
        console.log(typeof(200))
        if(edited.status==200){
            navigate(`../folderupload`)
        }
    }

    return(
        <>
        <div className="semRegistrationContainer">
            <h3>Upload csv files for the following</h3>
            <div className="upload-csv">
                <label htmlFor="facultyFile">Faculty Information: </label>
                <input type="file" id="facultyFile" onChange={handleFacultyFileChange}/> 
            </div>
            <div className="upload-csv">
                <label htmlFor="classFile">Class Information: </label>
                <input type="file" id="classFile" onChange={handleClassFileChange}/> 
            </div>
            <div className="upload-csv">
                <label htmlFor="subjectFile">Subject Information: </label>
                <input type="file" id="subjectFile" onChange={handleSubjectFileChange}/> 
            </div>
            <div className="upload-csv">
                <label htmlFor="mergeFile">Load Distribution Information: </label>
                <input type="file" id="mergeFile" onChange={handleMergeFileChange}/> 
            </div>
            <div className="upload-csv">
                <label htmlFor="studFile">Student Information: </label>
                <input type="file" id="studFile" onChange={handleStudentFileChange}/> 
            </div>
            <button className="upload-buttons" onClick={handleFileUpload}>Upload</button>            
        </div>
        </>
    )
}

export default SemesterRegistration