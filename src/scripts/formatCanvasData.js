//takes in the canvas array and outputs a 28x28 array that matches the MNIST data format
function removeColorData(pixelArray){
    let formattedPixelArray=[];
    for (let i = 3; i<pixelArray.length; i+=4){
        formattedPixelArray.push(pixelArray[i])
    }
    return formattedPixelArray
}
function addColorData(pixelArray){
    let formattedPixelArray = [];
    for (let i = 0; i<pixelArray.length; i++){
        formattedPixelArray.push(0)
        formattedPixelArray.push(0)
        formattedPixelArray.push(0)
        formattedPixelArray.push(pixelArray[i])
    }
    return formattedPixelArray;
}
function boundingBox(pixelArray){
    //control variables
    let sideLength = Math.sqrt(pixelArray.length)
    let [xMin, xMax, yMin, yMax] = [sideLength, 0, sideLength, 0];
    let [left, top] = [0, 0];
    for (let i = 0; i < pixelArray.length; i++) {
        if (pixelArray[i] > 0) {
            left = i%sideLength;
            top = (i-i%sideLength)/sideLength;
            if (left < xMin) {
                xMin = left;
            }
            if (left > xMax) {
                xMax = left;
            }
            if (top < yMin) {
                yMin = top;
            }
            if (top > yMax) {
                yMax = top;
            }
        } 
    }
    console.log([xMin, xMax, yMin, yMax])
    return [xMin, xMax, yMin, yMax]
}
function keepValuesInsideBox(pixelArray, boundingBox){
    let canvasSideLength = 150;
    let [xMin, xMax, yMin, yMax] = boundingBox;
    let filteredValues = [];
    for (let i = 0; i < pixelArray.length; i++) {
        let xCoord = i%canvasSideLength;
        let yCoord = (i-i%canvasSideLength)/canvasSideLength;
        if (xCoord >= xMin && xCoord <= xMax){
            if (yCoord >= yMin && yCoord <= yMax) {
                filteredValues.push(pixelArray[i])
        }
    }
}
    console.log(filteredValues);
    return filteredValues;
}

function centerCanvasImage(pixelArray) {
    let formattedPixelArray = removeColorData(pixelArray)
    let boundedBox = boundingBox(formattedPixelArray)
    formattedPixelArray = keepValuesInsideBox(formattedPixelArray,boundedBox)
    formattedPixelArray = addColorData(formattedPixelArray);
    formattedPixelArray = new Uint8ClampedArray(formattedPixelArray)
    const height = boundedBox[3]-boundedBox[2] + 1;
    const width = boundedBox[1]-boundedBox[0] + 1;
    return [width, height,formattedPixelArray, boundedBox]
}



module.exports = {centerCanvasImage, removeColorData};