import warnings
warnings.filterwarnings('ignore')
from tensorflow import keras
from tensorflow.keras.datasets import mnist
from matplotlib import pyplot as plot
import numpy as np

class dataPreProcessor:
    def __init__(self):
        (self.train_X, self.train_y), (self.test_X, self.test_y) = mnist.load_data()
        print('X_train: ' + str(self.train_X.shape))
        print('Y_train: ' + str(self.train_y.shape))
        print('X_test:  '  + str(self.test_X.shape))
        print('Y_test:  '  + str(self.test_y.shape))
        print(self.train_X[0].shape)
        # for i in range(9):  
        #     plot.subplot(330 + 1 + i)
        #     plot.imshow(self.train_X[i], cmap=plot.get_cmap('gray'))
        # plot.show()
    def helloWorld(self):
        print("Hello World")

    
if __name__ == "__main__":
    test = dataPreProcessor();
    test.helloWorld();
    