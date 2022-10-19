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

    imageURL = "http://localhost:3003/uploads/"+encoded
    url = imageURL.replace(" ", "%20")
    response = {
        'prediction': encoded
    }
    prediction = random.randint(1000, 4500)
    model_input = preprocess_data2([
        './uploads/1.dcm',
        './uploads/2.dcm',
        './uploads/3.dcm',
        './uploads/4.dcm',
        './uploads/5.dcm',
        './uploads/6.dcm',
        './uploads/7.dcm',
        './uploads/8.dcm',
        './uploads/9.dcm',
        './uploads/10.dcm',
    ])

    result = model2(np.array([[233, 3333, 44, 44, 333]]))
    print(result)
    return jsonify({"Prediction":4444.4}), 201

    # return jsonify({"ERROR":"AN ERROR HAPPENED"}), 201

if __name__ == "__main__":
    app.run(debug=True,port=5004)
