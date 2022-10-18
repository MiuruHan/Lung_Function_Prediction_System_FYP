const SessionAnswer  = require('../models/sessionAnswers')
const Sessions = require('../models/session')

exports.addSessionAnswer =  async  (req,res) => {
    const {user,session,date,video} = req.body

    if(user===""||user===null||session===""||session===null||req.files === null){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        var videos = [];
        for(var i=0;i<req.files.length;i++){
            videos[i]=req.files[i].path
        }
        const newSessionAnswer = new SessionAnswer({
            user,
            session,
            videos:videos
        })

        newSessionAnswer.save()
            .then(result=>{
                res.json({
                    Status: "Successful",
                    Message: 'Session answers has been recorded successfully.',
                    Session: result
                })
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened saving the record in " +
                        "DB.",
                    error: error
                })
            })
    }
}

function getSessions(session,userId){
    return new Promise((resolve,reject)=>{
        let sessionId = session._id
        SessionAnswer.find({session:sessionId,user:userId})
            .then(answer=>{
                if(answer.length>0){
                    resolve({
                        Session:session,
                        Status:"Completed",
                        Answer:answer
                    })
                }else{
                    resolve({
                        Session:session,
                        Status:"Available"
                    })
                }
            })
            .catch(error=>{
                reject({
                    Status: "Unsuccessful",
                    Message: "Happened while getting sessions answers from the DB",
                    Error: error
                })
            })
    })
}
exports.getSessionsUser = (req,res) => {
    const {userId}   = req.body
    if(userId===null||userId===""){
        res.json({Status: "Unsuccessful", Message: "User Id must be entered."})
    }else{
        Sessions.find()
            .then(sessions=>{
                Promise.all(sessions.map(session=>getSessions(session,userId)))
                    .then(updatedSessions=>{
                        res.json({Status:"Successful",SessionsOfUser:updatedSessions})
                    })
                    .catch(error => {
                        res.json({
                            Status: "Unsuccessful",
                            Message: "Happened while getting sessions from the DB",
                            Error: error
                        })
                    })
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened receiving the answers in " +
                        "DB.",
                    error: error
                })
            })
    }
}