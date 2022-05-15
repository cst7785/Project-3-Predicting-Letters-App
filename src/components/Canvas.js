import {useEffect, useRef, useState} from 'react'

let drawing = false;



export default function Canvas() {
    
    const canvasRef = useRef(null);
    const [context, setContext] = useState("")
    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')
        setContext(context);
    },[])
        
    function drawSettings() {
        context.lineWidth = 5;
        context.lineCap = "round";
        setContext(context)
    }
    function startDrawing(e) {
        console.log("Start of drawing")
        drawing = true;
        draw(e);    
    }
    function stopDrawing() {
        console.log("End of drawing")
        drawing = false;
        context.beginPath()
        setContext(context)
    }
    function draw(e) {
        if (!drawing) return;
        // console.log(e.clientX)
        // console.log(window.innerWidth)
        // console.log(canvasRef.current.offsetWidth)
        // let canvasX = canvasRef.current.offsetWidth*e.clientX/window.innerWidth
        // let canvasY = canvasRef.current.offsetHeight*e.clientY/window.innerHeight
        let canvasX = e.clientX - canvasRef.current.offsetLeft
        let canvasY = e.clientY - canvasRef.current.offsetTop
        context.lineTo(canvasX, canvasY);
        context.stroke();
        context.beginPath();
        context.moveTo(canvasX, canvasY)
        setContext(context)
    }
    
    return (
        <canvas className="canvas" ref={canvasRef} width="150px" height="150px" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw}></canvas>
    )
}