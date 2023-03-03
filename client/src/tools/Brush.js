import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmouseout = this.mouseOutHandler.bind(this)
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
    mouseOutHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            event: 'draw',
            idSession: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                event: 'draw',
                idSession: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop
                }
            }))
        }
    }

    static draw(ctx, x, y) {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
//когда выиграл перезагружать старинцу 
