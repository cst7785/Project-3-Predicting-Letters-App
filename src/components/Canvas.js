import {useEffect, useRef, useState} from 'react'

let drawing = false;



export default function Canvas() {
    
    const canvasRef = useRef(null);
    const [context, setContext] = useState("")
    const [canvas, setCanvas] = useState("")
    useEffect(()=>{
        const canvas = canvasRef.current;
        setCanvas(canvas)
        const context = canvas.getContext('2d')
        drawSettings(context);
        setContext(context);
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
    }
    function handleClick() {
        let rawCanvasData = context.getImageData(0,0,75,75).data
        let formattedData = require('../scripts/formatCanvasData')(rawCanvasData)
        _drawBoundingBox(formattedData)
        console.log(formattedData);
    }
    return (
        <>
            <canvas className="canvas" ref={canvasRef} width="75px" height="75px" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={drawLine}></canvas>
            <br/>
            <button onClick={clearDrawing}>Reset</button>
            <button onClick={handleClick}>Submit</button>
        </>
        )
    }