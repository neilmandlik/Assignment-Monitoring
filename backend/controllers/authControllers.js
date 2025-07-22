// const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const con=require("../models/MysqlConnect")
con.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the MySQL database');
});


const handleUser=(req,res)=>{
    // console.log("Hi")
    // const {user,password}=req.body
    // if(!user || !password){
    //     return res.status(400).json({'message': "Usernasme and password Required"})
    // }
    // let query=`select * from user where user_name="${user}"`
    // con.query(query,(error,result)=>{
    //     if(error){
    //         console.log(`Error fetching data: ${error}`)
    //     }
    //     else{
    //         if(result.length===0){
    //             return res.status(401).json({'message':"User Not Found"})
    //         }
    //         if(password == result[0].password){
    //             const accesstoken = jwt.sign(
    //             {"username": result[0].user_name},
    //             process.env.ACCESS_TOKEN,
    //             {expiresIn: '30s'}
    //             )
    //             const refreshtoken = jwt.sign(
    //                 {"username": result[0].user_name},
    //                 process.env.REFRESH_TOKEN,
    //                 {expiresIn: '1d'}
    //             )
    //             con.query(`insert into currentuser values("${result[0].user_name},${refreshtoken}")`,(error,r)=>{
    //                 if(error){
    //                     console.log(`Error fetching data: ${error}`)
    //                 }
    //             })
    //             res.cookie('jwt',refreshtoken,{httpOnly: true, maxAge: 24*60*60*1000})
    //             return res.json({accesstoken,user: result[0].user_name, desg: result[0].user_designation})
    //         }
    //         else{
    //             res.sendStatus(401)
    //         }
            
    //     }
    // })

    console.log("Hi")
    const{user,password} = req.body
    con.query(`select * from user where user_name = "${user}" and password = "${password}"`,(err,result)=>{
        if(err){
            console.log(`Error fetching data: ${err}`)
        }
        else{
            return res.json(result[0])
        }
    })
    // const match=await bcrypt.compare(password, foundUser.User_Password)
    
}

module.exports={handleUser}
