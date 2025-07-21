    import React, { useEffect, useState} from "react"
import { getData } from "../CRUDdata"
import { NavLink, Outlet, useLoaderData, useNavigate, useLocation, useParams } from "react-router-dom"

export async function gradeSubmissionLoader({params}){
    const{fAsgnId}=params
    return getData(`http://localhost:3002/api/json/seesubmission/${fAsgnId}`)
}
function GradeSubmission(){

    const {fAsgnId,class_name}=useParams()
    const loaderInfo=useLoaderData()
    const [info,setInfo]=useState(loaderInfo)
    const studentIsGraded=useLocation().state
    const navigate=useNavigate()
    const[onTimeShow,setOnTimeShow]=useState(true)
    const[lateShow,setLateShow]=useState(true)
    const[notShow,setNotShow]=useState(true)
    const[noSubmission,setNoSubmission]=useState(false)

    useEffect(()=>{
        const fetchData=async()=>{
            const edited=await getData(`http://localhost:3002/api/json/seesubmission/${fAsgnId}`)
            setInfo(edited)
            console.log(edited)
        }
        if(studentIsGraded){
            if(studentIsGraded.isGraded){
                fetchData()
                if(studentIsGraded.subStat>=0){
                    if(studentIsGraded.ind===info['onTimeSubmission'].length-1){
                        if(info['lateSubmission'].length!==0){
                            navigate(`${info['lateSubmission'][0].assignment_file_name}`,
                                {state: 
                                    {
                                        studId: info['lateSubmission'][0]['student_id'],
                                        subId: info['lateSubmission'][0]['subject_id'],
                                        subStat: info['lateSubmission'][0]['submissionStat'], 
                                        subDate: info['lateSubmission'][0]['submission_date'], 
                                        specStudent: info['lateSubmission'][0]['s_assignment_id'], 
                                        ind: 0 
                                    }
                                }
                            )
                        }
                        else{
                            navigate(`${info['onTimeSubmission'][0].assignment_file_name}`,
                                {state: 
                                    {
                                        studId: info['onTimeSubmission'][0]['student_id'],
                                        subId: info['onTimeSubmission'][0]['subject_id'],
                                        subStat: info['onTimeSubmission'][0]['submissionStat'], 
                                        subDate: info['onTimeSubmission'][0]['submission_date'], 
                                        specStudent: info['onTimeSubmission'][0]['s_assignment_id'], 
                                        ind: 0, 
                                        grade: info['onTimeSubmission'][0]['marks_given']
                                    }
                                }
                            )

                        }
                    }
                    else{
                        navigate(`${info['onTimeSubmission'][studentIsGraded.ind+1].assignment_file_name}`,
                            {state: 
                                {
                                    studId: info['onTimeSubmission'][studentIsGraded.ind+1]['student_id'],
                                    subId: info['onTimeSubmission'][studentIsGraded.ind+1]['subject_id'],
                                    subStat: info['onTimeSubmission'][studentIsGraded.ind+1]['submissionStat'], 
                                    subDate: info['onTimeSubmission'][studentIsGraded.ind+1]['submission_date'], 
                                    specStudent: info['onTimeSubmission'][studentIsGraded.ind+1]['s_assignment_id'], 
                                    ind: studentIsGraded.ind+1
                                }
                            }
                        )
                    }
                }   
                else{
                    if(studentIsGraded.ind===info['lateSubmission'].length-1){
                        if(info['onTimeSubmission'].length!==0){
                            navigate(`${info['onTimeSubmission'][0].assignment_file_name}`,
                                {state: 
                                    {
                                        studId: info['onTimeSubmission'][0]['student_id'],
                                        subId: info['onTimeSubmission'][0]['subject_id'],
                                        subStat: info['onTimeSubmission'][0]['submissionStat'], 
                                        subDate: info['onTimeSubmission'][0]['submission_date'], 
                                        specStudent: info['onTimeSubmission'][0]['s_assignment_id'], 
                                        ind: 0
                                    }
                                }
                            )
                        }
                        else{
                            navigate(`${info['lateSubmission'][0].assignment_file_name}`, 
                                {state: 
                                    {
                                        studId: info['lateSubmission'][0]['student_id'],
                                        subId: info['lateSubmission'][0]['subject_id'],
                                        subStat: info['lateSubmission'][0]['submissionStat'], 
                                        subDate: info['lateSubmission'][0]['submission_date'], 
                                        specStudent: info['lateSubmission'][0]['s_assignment_id'], 
                                        ind: 0, 
                                        grade: info['lateSubmission'][0]['marks_given']
                                    }
                                }
                            )

                        }
                    }
                    else{
                        navigate(`${info['lateSubmission'][studentIsGraded.ind+1].assignment_file_name}`,
                            {state: 
                                {
                                    studId: info['lateSubmission'][studentIsGraded.ind+1]['student_id'],
                                    subId: info['lateSubmission'][studentIsGraded.ind+1]['subject_id'],
                                    subStat: info['lateSubmission'][studentIsGraded.ind+1]['submissionStat'], 
                                    subDate: info['lateSubmission'][studentIsGraded.ind+1]['submission_date'], 
                                    specStudent: info['lateSubmission'][studentIsGraded.ind+1]['s_assignment_id'], 
                                    ind: studentIsGraded.ind+1
                                }
                            }
                        )
                    }
                            
                }
            }
        }                
    },[studentIsGraded])

    useEffect(()=>{
        console.log("Hi")
    },[info['onTimeSubmission']])
    useEffect(()=>{
        if(info['onTimeSubmission'].length!==0){
            navigate(`${info['onTimeSubmission'][0].assignment_file_name}`,
                {state: 
                    {
                        studId: info['onTimeSubmission'][0]['student_id'],
                        subId: info['onTimeSubmission'][0]['subject_id'],
                        subStat: info['onTimeSubmission'][0]['submissionStat'], 
                        subDate: info['onTimeSubmission'][0]['submission_date'], 
                        specStudent: info['onTimeSubmission'][0]['s_assignment_id'], 
                        ind: 0, 
                        grade: info['onTimeSubmission'][0]['marks_given']
                    }
                })
        }
        else if(info['lateSubmission'].length!==0){
            navigate(`${info['lateSubmission'][0].assignment_file_name}`, 
                {state: 
                    {
                        studId: info['lateSubmission'][0]['student_id'],
                        subId: info['lateSubmission'][0]['subject_id'],
                        subStat: info['lateSubmission'][0]['submissionStat'], 
                        subDate: info['lateSubmission'][0]['submission_date'],
                        specStudent: info['lateSubmission'][0]['s_assignment_id'], 
                        ind: 0, 
                        grade: info['lateSubmission'][0]['marks_given']}})
        }
        else{
            setNoSubmission(true)
        }
    },[])

    const handleOnTimeStudentShow=()=>{
        setOnTimeShow(!onTimeShow)
    }

    const handleLateStudentShow=()=>{
        setLateShow(!lateShow)
    }

    const handleNotStudentShow=()=>{
        setNotShow(!notShow)
    }

    const activeStyle={
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    return(
        <>
            <div className="gradeSubmission-wala-content-box">
                <div className="back-and-deadline">
                    <NavLink to={`../..`} relative="path">Back</NavLink>
                    <p>Deadline Date: {info['deadline_date']}</p>
                </div>
                <nav className="submissions-sidebar">
                    <button className="drop-down-buttons" onClick={handleOnTimeStudentShow}>{onTimeShow?"v":">"} On-Time Submission</button> 
                    {info['onTimeSubmission'].length!==0 && onTimeShow
                    ?  
                    info['onTimeSubmission'].map((ele,i)=>
                        <div className="submissions-spans on-time-submissions-spans">
                            <span key={i}><NavLink to={`${ele.assignment_file_name}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}} 
                            state=
                            {
                                {
                                    studId: ele.student_id,
                                    subId: ele.subject_id,
                                    subStat: ele.submissionStat, 
                                    subDate: ele.submission_date, 
                                    specStudent: ele.s_assignment_id, 
                                    ind: i, grade: ele.marks_given
                                }
                            }>{ele.student_name}{ele.marks_given!=="-"?`: ${ele.marks_given}/10`:null}</NavLink></span>
                        </div>
                    )
                    :
                    null
                    }
                    <button className="drop-down-buttons" onClick={handleLateStudentShow}>{lateShow?"v":">"} Late Submission</button>
                    {info['lateSubmission'].length!==0 && lateShow
                    ?  
                    info['lateSubmission'].map((ele,i)=>
                        <div className="submissions-spans late-submissions-spans">
                            <span key={i}>&nbsp;<NavLink to={`${ele.assignment_file_name}`} style={({isActive})=>isActive?activeStyle:{textDecoration:'none'}} 
                            state=
                            {
                                {
                                    studId: ele.student_id,
                                    subId: ele.subject_id,
                                    subStat: ele.submissionStat, 
                                    subDate: ele.submission_date, 
                                    specStudent: ele.s_assignment_id, 
                                    ind:i, 
                                    grade: ele.marks_given
                                }
                            }>{ele.student_name}{ele.marks_given!=="-"?`: ${ele.marks_given}/10`:null}</NavLink> &nbsp;</span>
                        </div>
                    )
                    :
                    null
                    }
                    <button className="drop-down-buttons" onClick={handleNotStudentShow}>{notShow?"v":">"} Not Submitted</button> 
                    {info['notSubmitted'].length!==0 && notShow
                    ?  
                    info['notSubmitted'].map(ele=>
                        <div className="submissions-spans not-submissions-spans">
                            <><span>{ele.student_name}</span></>
                        </div>
                    )
                    :
                    null
                    }
                    
                </nav>
                <div className="GS-content">
                    {noSubmission?null:<Outlet/>}
                </div>
            </div>
        </>
    )
}
export default GradeSubmission