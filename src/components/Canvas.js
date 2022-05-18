import {useEffect, useRef, useState} from 'react'
import {centerCanvasImage, removeColorData} from '../scripts/formatCanvasData'

let drawing = false;



export default function Canvas() {
    
    const canvasRef = useRef(null);
    const canvasRef2 = useRef(null);
    const canvasRef3 = useRef(null);
    const [context, setContext] = useState("")
    const [canvas, setCanvas] = useState("")
    const [context2, setContext2] = useState("")
    const [canvas2, setCanvas2] = useState("")
    const [context3, setContext3] = useState("")
    const [canvas3, setCanvas3] = useState("")
    useEffect(()=>{
        const canvas = canvasRef.current;
        const canvas2 = canvasRef2.current;
        const canvas3 = canvasRef3.current;
        setCanvas(canvas)
        setCanvas2(canvas2)
        setCanvas3(canvas3)
        const context = canvas.getContext('2d')
        const context2 = canvas2.getContext('2d')
        const context3 = canvas3.getContext('2d')
        context.fillRect(0,0,50,50)
        drawSettings(context);
        setContext(context);
        setContext2(context2);
        setContext3(context3);
    },[])
        
    function drawSettings(ctx) {
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
    }
    function startDrawing(e) {
        drawing = true;
        //For some reason, this is needed to draw a point on click, errors if consolidated into same function
        drawPoint(e)  
    }
    function stopDrawing() {
        drawing = false;
        context.beginPath()
    }
    function clearDrawing() {
        context.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
        context2.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
        // canvas2.width = 150;
        // canvas2.height = 150;
    }
    function drawPoint(e) {
        if (!drawing) return;
        let canvasX = e.clientX - canvas.offsetLeft
        let canvasY = e.clientY - canvas.offsetTop

        context.beginPath();
        context.moveTo(canvasX, canvasY)
        context.lineTo(canvasX, canvasY);
        context.stroke();
    }
    function drawLine(e) {
        if (!drawing) return;
        let canvasX = e.clientX - canvas.offsetLeft
        let canvasY = e.clientY - canvas.offsetTop

        context.lineTo(canvasX, canvasY);
        context.stroke();
        context.beginPath();
        context.moveTo(canvasX, canvasY)
    }
    function _drawBoundingBox(coords){
        context.strokeRect(coords[0],coords[2],coords[1]-coords[0],coords[3]-coords[2])
        canvas2.width = coords[1]-coords[0];
        canvas2.height = coords[3]-coords[2];
        // canvas2.width = 22;
        // canvas2.height = 22;
    }
    function handleClick() {
        let rawCanvasData = context.getImageData(0,0,150,150)
        let formattedData = centerCanvasImage(rawCanvasData.data)
        let centeredImage = new ImageData(formattedData[2],formattedData[0],formattedData[1])
        _drawBoundingBox(formattedData[3]);
        context2.putImageData(centeredImage,0,0)
        canvas3.width = 28;
        canvas3.height = 28;
        context3.drawImage(canvas2, 3, 3, 22, 22)
        rawCanvasData = context3.getImageData(0,0,28,28)
        console.log(removeColorData(rawCanvasData.data))
    }
    return (
        <>
            <canvas className="canvas" ref={canvasRef} width="150px" height="150px" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={drawLine}></canvas>
            <canvas className="canvas hidden" ref={canvasRef2} width="150px" height="150px"></canvas>
            <canvas className="canvas hidden" ref={canvasRef3} width="150px" height="150px"></canvas>
            <br/>
            <button onClick={clearDrawing}>Reset</button>
            <button onClick={handleClick}>Submit</button>
        </>
        )
    }