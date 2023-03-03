import { makeAutoObservable } from "mobx";

class CanvasState{
    username = null 
    canvas = null
    socket = null
    sessionid = null
    constructor(){
        makeAutoObservable(this)
    }
    setCanvas(canvas){
        this.canvas = canvas
    }
    setUsername(username){
        this.username = username
    }
    setSessionId(id) {
        this.sessionid = id
    }
    setSocket(socket) {
        this.socket = socket
    }
}
export default new CanvasState()