 import {runInAction, makeAutoObservable } from "mobx";

class Player{
  words=["привет","пока","тест","111","222","333","444"]
  show = false
  toggle = false
    constructor(){
        makeAutoObservable(this)
        this.players = 0
    }
    setUsername(username){
      this.username = username
    }
    setPlayers(){
     this.players+=1
    }
    setShow(state){
      runInAction(()=>{
        this.show=state
      })
    }
    setToggle(state){
      runInAction(()=>{
        this.toggle=state
      })
    }
   
  }


export default new Player()