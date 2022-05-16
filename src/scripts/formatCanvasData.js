//takes in the canvas array and outputs a 28x28 array that matches the MNIST data format

function boundingBox(pixelArray){
    //control variables
    let sideLength = Math.sqrt(pixelArray.length)
    let [xMin, xMax, yMin, yMax] = [sideLength, 0, sideLength, 0];
    let [left, right, top, bottom] = [0, 0, 0, 0];
    for (let i = 0; i < pixelArray.length; i++) {
        console.log(pixelArray[i])
        if (pixelArray[i] > 0) {
            left = i%sideLength;
            // right = sideLength-left;
            top = (i-i%sideLength)/sideLength;
            // bottom = sideLength-top;
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




function formatCanvasData(pixelArray) {
    //remove color values
    let formattedPixelArray=[];
    for (let i = 3; i<pixelArray.length; i+=4){
        formattedPixelArray.push(pixelArray[i])
    }
    return boundingBox(formattedPixelArray)
    //map NxN array to 22x22
}


module.exports = formatCanvasData;