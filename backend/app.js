const cors=require('cors')
const mul=require('multer')
const corsOpt=require('./config/corsOpt')
const express=require('express')
const app=express()
const logger=require('./middleware/logData')
const {verifyJWT} = require('./middleware/verifyJWT')

const {
    uploadFolder,
    updateMarks,
    seeSubmission,
    deleteFile,
    semesterRegistrationAssociations,
    uploadFile,
    addNewFeedbackForm,
    changeFeedbackFormState,
    unsubmitAssignment,
    getAssignmentDetails,
    updateFeedBackQuestion,
    getAllFacultyReport,
    deleteFeedbackQuestion,
    postFeedBackQuestion,
    getFeedbackQuestions,
    getFeedbackReport,
    getFacClassSubList,
    putFeedback,
    feedBackOfAStudent,
    getTableData,
    getUser,
    removeCurrentUser,
    getFloorDetails,
    showClass,
    showSubjectsFaculty,
    showsubjects,
    subAndAssgnOfSpecClass,
    addAssignments,
    updateAssignmentDetails,
    trackAssignments,
    deleteAssignments,
}=require('./controllers/userControllers')

const {handleUser} = require('./controllers/authContoller')

app.use(cors(corsOpt))
app.use(express.json())

const storage=mul.diskStorage({
    destination: function(req,file,cb){
        if(req.body.objId==1){
            cb(null,`../../my-app-3/public/${req.body.subId}/answers/${req.body.className}/${req.body.studId}`)
        }
        else if(req.body.objId==2){
            cb(null,`../../my-app-3/public`)
        }
        else if(req.body.objId==3){
            let path=req.body.paths[0]
            let folder=path.slice(path.indexOf('/')+1)
            let subId=folder.slice(0,folder.indexOf('/'))
            cb(null,`../../my-app-3/public/${subId}/questions`)
            req.body.paths.shift()
        }
        else{
            cb(null,`../../my-app-3/public`)
        }
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }

})
const upload=mul({storage})

app.post("/api/json/login",handleUser)

app.delete("/api/json/deleteTable/:user",removeCurrentUser)


app.put('/api/json/updatemarks',updateMarks)

app.delete("/api/json/deletefile/:fname",deleteFile)

app.post('/api/json/semeterregistrationassociations',upload.array('files',5),semesterRegistrationAssociations)

app.post('/api/json/uploadfile',upload.single('file'),uploadFile)

app.post('/api/json/uploadfolder',upload.array('files',70),uploadFolder)

app.get('/api/json/seesubmission/:faid',seeSubmission)

app.post("/api/json/addnewfeedbackform",addNewFeedbackForm)

app.put("/api/json/changefeedbackformstate",changeFeedbackFormState)

app.put("/api/json/updatefeedbackquestion",updateFeedBackQuestion)

app.get("/api/json/getallfacultyreport/:fnum",getAllFacultyReport)

app.delete("/api/json/deletefeedbackquestion/:qid",deleteFeedbackQuestion)

app.post("/api/json/postfeedbackquestion",postFeedBackQuestion)

app.get("/api/json/getfeedbackquestions",getFeedbackQuestions)

app.get("/api/json/getfeedbackreport/:fnum/:rec/:recO/:conf",getFeedbackReport)

app.get("/api/json/getfacclasssublist/:formId",getFacClassSubList)

app.put("/api/json/feedback",putFeedback)

app.get("/api/json/feedbackof/:username",feedBackOfAStudent)

app.get("/api/json/gettabledata",getTableData)

app.delete("/api/json/deleteassignment/:id",deleteAssignments)

app.get('/api/json/assignmenttrack',trackAssignments)

app.put('/api/json/unsubmitasgn',unsubmitAssignment)

app.get('/api/json/getasgndetails/:user/:subid/:asgnnum',getAssignmentDetails)

app.put('/api/json/updateasgndetails',updateAssignmentDetails)

app.put('/api/json/assignmenttrack',addAssignments)

app.get('/api/json/subAndAsgnInSpecClass/:username/:classname/:subname',subAndAssgnOfSpecClass)

// app.get('/api/json/studentassignment/:user/:sub_name',studentAssignments)

app.get('/api/json/showsubjectsfaculty/:facName/:className',logger,showSubjectsFaculty)

app.get('/api/json/showsubjects/:username',showsubjects)

app.get("/api/json/showclass/:user/:desg",showClass)

app.get("/api/json/getFloor/:dep/:id",getFloorDetails)



app.listen(3002,()=>{
    console.log("Server listening on port 3002")
})

   
   
