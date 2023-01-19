import { makeAutoObservable } from "mobx";

class ToolState{
    tool = null
    constructor(){
        makeAutoObservable(this)
    }
    setTool(tool){
        this.tool = tool
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
    setWidthArc(arc){
        this.tool.widthArc=arc
}
}
export default new ToolState()