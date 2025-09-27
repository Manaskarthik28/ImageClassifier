# import necessary dependencies
import os 
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image 
from PIL import Image
import numpy as np  

# Initialise the flask app
app = Flask(__name__)

# load the model
model = ResNet50(weights = 'imagenet')

# define routing for home page
@app.route('/')
def home():
    return render_template('index.html')

# prepare the image for prediction
def prepare_image(img_path):
    img = Image.open(img_path)
    img = img.resize((224,224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

# define API routing for prediction
@app.route('/predict', methods = ['POST'])
def predict():
    file = request.files['file']
    if file:
        # store the image temperarily
        img_path = 'temp_img.jpg'
        file.save(img_path)
        # make predictions
        preprocessed_img = prepare_image(img_path)
        predictions = model.predict(preprocessed_img)
        decoded_predictions = decode_predictions(predictions, top=3)[0]

        # convey the results to frontend
        results = []
        for i,(imagenet_id, label,score) in enumerate(decoded_predictions):
            results.append({
                'label':label,
                'score':float(f"{score:.4f}")
            })
        
        # close the temp path for next image
        os.remove(img_path)
        return jsonify(results)

# call the flask application
if __name__ == '__main__':
    app.run(debug=True)
    


