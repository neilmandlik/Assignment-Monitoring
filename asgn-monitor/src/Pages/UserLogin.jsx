import { useNavigate} from "react-router-dom"
import { postData } from "../CRUDdata"
import { useRef,useEffect, useState} from "react"


function UserLogin(){
    localStorage.setItem("isLoggedIn",true)
    const navigate=useNavigate();

    const userRef=useRef();
    const errRef=useRef();

    const[name,setName]=useState('')
    const[password,setPass]=useState('')
    const[res,setRes]=useState("")

    // useEffect(()=>{
    //     userRef.current.focus();
    // },[])

    useEffect(()=>{
        setRes('')
    },[name,password])

    const handleNameChange=(event)=>{
        setName(event.target.value)
    }

    const handlePassChange=(event)=>{
        setPass(event.target.value)
    }
    
    const handleClick=async (event)=>{
        let toPost={
            user:name,
            password:password
        }
        const login = await postData(toPost,`http://localhost:3002/api/json/login`)
        console.log(login)
        if(login.status === 200){
            navigate(`/user/${login.user}/${login.desg}`)
        }
    }
    return(
        <>
            <div class="container-login">
                <div class="login">
                    <div class="trial">
                        <h2>Welcome Back</h2>
                        <div className="dabba username ">                    
                            <label htmlFor="username">Username: </label>
                            <input  
                                type="text" 
                                name="Username" 
                                id="username" 
                                placeholder="Enrollment no" 
                                value={name} 
                                onChange={handleNameChange}
                                required
                            /> 
                            <br /> <br />
                        </div>
                        <div className="dabba password">
                            <label htmlFor="password">Password: </label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={handlePassChange}
                                required
                            /> <br />
                        </div>
                        <button class="login-btn" onClick={handleClick}>Login</button> <br />
                        <p>{res}</p>
                    </div>
                </div>
            </div>           
        </>
    )
}

export default UserLogin