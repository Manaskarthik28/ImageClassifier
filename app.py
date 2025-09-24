# necessary import libraries
import os
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np 

# initialise flask app
app = Flask(__name__)

#load the model
model = ResNet50(weights = 'imagenet')

# define function to process image
def prepare_image(img_path):
    img = Image.open(img_path)
    img = img.resize((224,224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array,axis=0)
    img_array = preprocess_input(img_array)
    return img_array

# define api routing for base template
@app.route('/')
def home():
    return render_template('index.html')

# define api routing for image prediction
@app.route('/predict', methods = ['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error':'No Image File provided'}),400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error':'No Image Uploaded'}),400
    
    if file:
        # store the file temperarily
        img_path = 'temp_img.jpg'
        file.save(img_path)

        # call our function to predict image
        preprocessed_img = prepare_image(img_path)
        # make predictions
        predictions = model.predict(preprocessed_img)
        decoded_predictions = decode_predictions(predictions, top=3)[0]

        # convey our results in human readable to frontend
        results = []
        for i,(imagenet_id,label,score) in enumerate(decoded_predictions):
            results.append({
                'label':label,
                'score':float(f"{score:.4f}")
            })
        # remove our temp file for next image
        os.remove(img_path)
        return jsonify(results)
    
# call our flask app
if __name__ == '__main__':
    app.run(debug=True)