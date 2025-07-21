import { useEffect, useState } from "react"
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { deleteData, getData, postFile, putData } from "../../CRUDdata"

export async function sAssignmentSubmitLoader({request,params}){
    const sp=new URL(request.url).searchParams
    const{username,sub_id,asgn}=params
    const submDate=await getData(`http://localhost:3002/api/json/getasgndetails/${username}/${sub_id}/${asgn}`)
    const dDate=sp.get('deadline')
    return {dDate,submDate: submDate[0].submission_date, fileName: submDate[0].assignment_file_name, className: submDate[0].class_name, studId: submDate[0].student_id} 
}

function SAssignmentsSubmit(){

    const navigate=useNavigate()
    const {sub_id,username,asgn}=useParams()
    const asgnNum=asgn.slice(asgn.indexOf('A')+1)
    const dateInfo=useLoaderData()
    const [submissionDate,setSub]=useState(dateInfo.submDate==="Not Submitted"?"":dateInfo.submDate)
    const isDate=dateInfo.dDate==="notGiven"
    const [file,setFile]=useState()

    useEffect(()=>{
        console.log(isDate)
        console.log(dateInfo)
        console.log(asgn.slice(asgn.indexOf('A')+1))
    },[])

    const handleSubmissionDate=(event)=>{
        setSub(event.target.value)
    }

    const handleFileChange=(e)=>setFile(e.target.files[0])

    const handleUnsubmitAssignment=async()=>{
        const toPut={
            deadlineDate: dateInfo.dDate,
            username,
            subid:sub_id,
            asgn
        }
        await putData(toPut,"http://localhost:3002/api/json/unsubmitasgn")
        const edited=await deleteData(`http://localhost:3002/api/json/deletefile/${dateInfo.fileName}`)
        console.log(edited.message)
        navigate('../..',{relative:'path'})
    }

    const handleExecuteSubmission=async(a)=>{
        const toPut={
            fileName: file.name,
            submissionDate: a,
            deadlineDate: dateInfo.dDate,
            username: username,
            asgn:asgn.slice(1),
            subId: sub_id, 
        }

        const formDataObj={
            objId: 1,
            subId: sub_id,
            className: dateInfo.className,
            studId: dateInfo.studId,
            'file': file,
        }
        if(!file){
            alert("Please Select a file")
        }
        else{            
            await putData(toPut,'http://localhost:3002/api/json/updateasgndetails')
            const edited=await postFile(formDataObj,"http://localhost:3002/api/json/uploadfile")
            console.log(edited.message)
            navigate('../..',{relative: 'path'})
        }
    }

    return(
        <>
            <div className="content">
                <Link to='../..' relative="path">Back</Link>
                {!isDate?
                <>
                    <section>
                        <input type="date" value={submissionDate} onChange={handleSubmissionDate}/> 
                        {dateInfo.submDate==="Not Submitted"?    
                        <>
                            <input type="file" onChange={handleFileChange}/> 
                            <button className="buttons" onClick={()=>handleExecuteSubmission(submissionDate)}>Submit</button>
                        </>      
                        :
                        <>
                            <br /><a href={`/${sub_id}/answers/${dateInfo.className}/${dateInfo.studId}/${dateInfo.fileName}`} target="_blank">View Submitted File</a> 
                            <button onClick={()=>handleUnsubmitAssignment()}>Unsubmit</button>
                        </>
                        
                        }

                        <iframe src={`/${sub_id}/questions/Assignment ${asgnNum}.pdf`} frameborder="0"></iframe>

                    </section>
                </>
                :
                <>
                    <section id="notice-section">
                        <p id="notice">The Assignment hasn't been allocated yet</p>
                    </section>
                </>
                }
            </div>

        </>
    )
}

export default SAssignmentsSubmit