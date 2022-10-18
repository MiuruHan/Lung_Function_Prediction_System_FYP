const Session  = require('../models/session')

exports.addSession =  async  (req,res) => {
    const {sessionName,questions} = req.body

    if(sessionName===""||sessionName===null|| questions === null){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        if(questions.length>0){
            let questions2 = [];
            for(let i=0;i<questions.length;i++){
                questions2.push(questions[i]);
            }
            const newSession = new Session({
                sessionName,
                questions:questions2
            })
            console.log(questions2)
            newSession.save()
                .then(result=>{
                    res.json({
                        Status: "Successful",
                        Message: 'Session has been added successfully.',
                        Session: result
                    })
                })
                .catch(error=>{
                    res.json({
                        Status: "Unsuccessful",
                        Message: "Happened saving the session in " +
                            "DB.",
                        error: error
                    })
                })
        }else{
            res.json({
                Status: "Unsuccessful",
                Message: "Please add one or more questions?",
                error: error
            })
        }
    }
}

exports.getSessions = async (req,res) =>{
    Session.find()
        .then(sessions=>{
            res.json({
                "Status":"Successful",
                "Sessions": sessions
            })
        })
        .catch(error=>{
            res.json({
                "Status":"Unsuccessful",
                "Error": error
            })
        })
}