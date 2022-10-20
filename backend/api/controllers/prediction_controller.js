const Predictions= require('../models/prediction')
const request = require('request-promise')


PYTHON_FLASK_API_URL = "http://127.0.0.1:5004/"
// ************************* To predict body fat **************************
exports.predict= async (req,res) => {
    const {
        userId,weekNumber,age,lungFunctionCapacity,gender,smokingStatus
    } = req.body

    console.log("IMAGES",req.files[0])
    if(userId===""||weekNumber===null||age===null||
        lungFunctionCapacity===null||gender===null||smokingStatus===null
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        // Take the prediction for the body fat level from the flask api
        const options = {
            method: 'POST',
            uri: PYTHON_FLASK_API_URL+"predict",
            body: {
                "images":[
                    "./uploads/"+req.files[0].originalname.toString(),
                    "./uploads/"+req.files[1].originalname.toString(),
                    "./uploads/"+req.files[2].originalname.toString(),
                    "./uploads/"+req.files[3].originalname.toString(),
                    "./uploads/"+req.files[4].originalname.toString(),
                    "./uploads/"+req.files[5].originalname.toString(),
                    "./uploads/"+req.files[6].originalname.toString(),
                    "./uploads/"+req.files[7].originalname.toString(),
                    "./uploads/"+req.files[8].originalname.toString(),
                    "./uploads/"+req.files[9].originalname.toString(),
                ],
                "image":"image1",
                "weekNumber":weekNumber,
                "age":age,
                "lungFunctionCapacity":lungFunctionCapacity,
                "gender":gender,
                "smokingStatus":smokingStatus
            },
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        request(options)
            .then(function (response){
                let dataFromFlaskAPI = JSON.stringify(response)
                dataFromFlaskAPI= JSON.parse(dataFromFlaskAPI)
                dataFromFlaskAPI = dataFromFlaskAPI.Prediction
                console.log(dataFromFlaskAPI)

                res.json({
                    Status: "Successful",
                    Message: 'Record  has been saved successfully.',
                    Prediction : dataFromFlaskAPI
                })

            })
            .catch(function (err) {
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened while sending the request to Flask API",
                    error: err
                })
            })
    }
}