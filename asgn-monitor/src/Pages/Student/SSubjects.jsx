import { useLoaderData,Link } from "react-router-dom";
import { getData } from "../../CRUDdata";
import STheoryTable from "./STheoryTable";
import SPracticalTable from "./SPracticalTable";
export async function studSubjectLoader({params}){
    const {username}=params
    return getData(`http://localhost:3002/api/json/showsubjects/${username}`)
}

function StudentSubject(){

    const subjects=useLoaderData()
    
    return (
        <>
            <div className="student-tablespace" >
                <p>Theory</p>
                <STheoryTable tableData={subjects.filter(ele=>ele.subject_type==='theory')} />

                <p>Practical</p>
                <SPracticalTable tableData={subjects.filter(ele=>ele.subject_type==='practical')} />
            </div>
        </>
    )
}


export default StudentSubject