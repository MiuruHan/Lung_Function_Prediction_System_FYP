from flask import Flask , jsonify , request
from tensorflow.keras.models import load_model
import base64
app = Flask(__name__)
import cv2
import numpy as np
from werkzeug.utils import secure_filename
import os
from PIL import Image
import io
from numpy import asarray
import tensorflow as tf
import urllib.request
import pydicom
from PIL import Image
import random

IMAGES_UPLOAD_DIRECTORY = r"./static/uploads"
app.config['UPLOAD_FOLDER']=IMAGES_UPLOAD_DIRECTORY
ALLOWED_FILE_TYPE = set(['jpg','jpeg','png'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_FILE_TYPE

def getModel():
    global model,model2
    model=load_model('Lung_Function_Prediction_Model.h5')
    model2 = load_model('ANN_model_v7.h5')
    print("*! Models are loaded")


def preprocess_data2(CT_IMAGES_PATHS):
    input = []

    for CT_image_location in CT_IMAGES_PATHS:
        ct_dicom = pydicom.read_file(CT_image_location)
        print(ct_dicom.pixel_array)
        resized_image=cv2.resize(np.array(ct_dicom.pixel_array),(50,50))
        image=np.array(resized_image)
        input.append(image)
    input = np.array(input)
    input2 = []
    input2.append(input)
    input2 = np.array(input2)
    input2 = input.reshape(1, 10, 50, 50, 1)
    # prediction_CNN_LSTM = model(input2).tolist()
    return input2

print("========================== Loading custom model ===============================")
getModel()


@app.route('/',methods=['GET'])
def index():
    return jsonify({"API":"This is the python API for getting the predictions from the models"})

@app.route('/predict',methods=['POST'])
def getMoodPrediction():
    getModel()
    data = request.get_json(force=True)
    encoded = data['image']
    weekNumber = data['weekNumber']
    print("WEEKNUMBER "+ weekNumber)
    print(data['gender'])
    print(data['smokingStatus'])
    imageURL = "http://localhost:3003/uploads/"+encoded
    url = imageURL.replace(" ", "%20")
    response = {
        'prediction': encoded
    }
    genderAttrt = 0
    smokingStatus = 0

    if data['gender']=="Male":
        genderAttrt = int(1)
    else:
        genderAttrt = int(0)

    if data['smokingStatus'] == "Currently Smoking":
        smokingStatus =  int(1)
    elif data['smokingStatus'] == "Stopped Smoking":
        smokingStatus = int(0)
    elif data['smokingStatus'] == "Never Smoked":
        smokingStatus = int(-1)

    prediction = random.randint(1000, 4500)
    print(data["images"])
    model_input = preprocess_data2(data["images"])

    result = model2.predict(np.array([[
        tf.strings.to_number(data["weekNumber"], out_type=tf.float32),
        tf.strings.to_number(data["lungFunctionCapacity"], out_type=tf.float32),
        tf.strings.to_number(data["age"], out_type=tf.float32),
        genderAttrt,
        smokingStatus
    ]]))
    print(result[0][0])
    result = int(result[0][0])
    return jsonify({"Prediction":result}), 201

    # return jsonify({"ERROR":"AN ERROR HAPPENED"}), 201

if __name__ == "__main__":
    app.run(debug=True,port=5004)
