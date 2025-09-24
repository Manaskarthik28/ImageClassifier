# ImageClassifier
This project demonstrates image classification using ResNet50 deep learning CNN architecture.
# Residual Networks
The core idea behind ResNet is the use of residual blocks. In a traditional neural network, each layer feeds its output to the next layer. However, in a residual network, the output of a layer is added to the input of a layer several steps ahead. This is known as a skip connection or shortcut connection.

Mathematically, if the input to a residual block is ( x ) and the desired underlying mapping is ( H(x) ), the residual block aims to learn the residual function ( F(x) = H(x) - x ). Thus, the output of the block is ( H(x) = F(x) + x ). This formulation helps in mitigating the vanishing gradient problem and stabilizes the training of very deep networks.

1) Preparing ImageClassifer project

Instructions for Django Image Classifier project
Ubuntu
- create a folder named ImageClassifier and cd into folder using ubuntu
- sudo apt-get update
- create venv python3 -m venv venv
-activate venv source venv/bin/activate
- create requirements.txt and enter flask, numpy, tensorflow, gunicorn
- install requirements with pip install -r requirements.txt
- create app.py file this is used to run flask server application and handle model logic.
- create templates folder in same directory with app.py and predict.py
- create index.html and place the code
- create a static folder and inside create a folder names 'js' and 'css'
- open css folder and include style.css
- open js folder and include scripts.js code
- run flask application python app.py
- you can open local host server and test by uploading an image
- create screenshots folder in app directory and upload predicted results
- Create Procfile in your project root directory and this is used by deployment server to deploy flask application.
- modify procfile with web: gunicorn app: app 
- create github account and create a repo for your project
- zip your project folder and upload it to github and commit from main branch

2) Deploying your application
- create render account and connect your github repo created under render dashboard
- Wait for your application and it is now successfully running



