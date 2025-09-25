# ImageClassifier
This project demonstrates image classification using ResNet50 deep learning CNN architecture.
# Residual Networks
The core idea behind ResNet is the use of residual blocks. In a traditional neural network, each layer feeds its output to the next layer. However, in a residual network, the output of a layer is added to the input of a layer several steps ahead. This is known as a skip connection or shortcut connection.

Mathematically, if the input to a residual block is ( x ) and the desired underlying mapping is ( H(x) ), the residual block aims to learn the residual function ( F(x) = H(x) - x ). Thus, the output of the block is ( H(x) = F(x) + x ). This formulation helps in mitigating the vanishing gradient problem and stabilizes the training of very deep networks.


Deployment images can be found in Screenshots folder
Deployment Link: https://imageclassifier-jaze.onrender.com/

