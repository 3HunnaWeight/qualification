
import canvasState from "../store/canvasState";
import toolState from "../store/toolState"
import Tool from "./Tool"
export default class Brush extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            event: 'draw',
            idSession: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            canvasState.socket.send(JSON.stringify({
                event: 'draw',
                idSession: this.id,
            }))
        }
    }

    static draw(ctx, x, y) {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}