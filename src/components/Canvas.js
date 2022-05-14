import {useEffect, useRef} from 'react'

let drawing = false;



export default function Canvas() {
    
    const canvasRef = useRef(null);
    let contextRef = useRef(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');
        drawSettings();
        // contextRef.current.fillRect(20,20,50,50)
    },[])
    
    function drawSettings() {
        contextRef.lineWidth = 5;
        contextRef.lineCap = "round";
    }
    function startDrawing(e) {
        console.log("Start of drawing")
        drawing = true;
        draw(e);    
    }
    function stopDrawing() {
        console.log("End of drawing")
        drawing = false;
        contextRef.beginPath()
    }
    function draw(e) {
        if (!drawing) return;
        contextRef.current.lineTo(e.clientX, e.clientY);
        contextRef.current.stroke();
        contextRef.current.beginPath();
        contextRef.moveTo(e.clientX, e.clientY)
    }
    
    return (
        <canvas class="canvas" ref={canvasRef} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw}></canvas>
    )
}