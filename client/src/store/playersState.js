 import { makeAutoObservable } from "mobx";

class Player{
  words=["привет","пока","тест"]
  
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
  }

export default new Player()