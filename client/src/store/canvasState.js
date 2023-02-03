import { makeAutoObservable } from "mobx";

class CanvasState{
    canvas = null
    socket = null
    sessionid = null
    constructor(){
        makeAutoObservable(this)
    }
    setCanvas(canvas){
        this.canvas = canvas
    }
    setSessionId(id) {
        this.sessionid = id
    }
    setSocket(socket) {
        this.socket = socket
    }
}
export default new CanvasState()