import { makeAutoObservable } from "mobx";

class CanvasState{
    constructor(){
        makeAutoObservable(this)
    }
    setCanvas(canvas){
        this.canvas = canvas
    }
}
export default new CanvasState()