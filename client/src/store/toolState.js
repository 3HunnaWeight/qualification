import {runInAction, makeAutoObservable } from "mobx";

class ToolState{
    tool = null
    constructor(){
        makeAutoObservable(this)
    }
   
    setTool(tool){
        runInAction(()=>{
            this.tool = tool
        })
        
    }
    setFillColor(color) {
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
    }
    setWidth(width){
        this.tool.lineWidth = width
    }
}

export default new ToolState()