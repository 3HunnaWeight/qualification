
import toolState from "../store/toolState"
import Tool from "./Tool"
export default class Brush extends Tool{
    constructor(canvas,arc){
        super(canvas,arc)
        this.listen()
       
    }

    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    mouseUpHandler(e){
        this.mouseDouwn = false
    }
    mouseDownHandler(e){
        this.mouseDouwn = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e){
        if(this.mouseDouwn){
        this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop,toolState.setWidthArc())
        
        }
        
    }

    draw(x,y,arc){
        this.ctx.lineTo(x,y)  
        this.ctx.stroke()
        this.ctx.arc(x,y,arc,0,Math.PI*2) 
        
    }
  
}