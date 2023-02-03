import {runInAction, makeAutoObservable } from "mobx";

class Socket{ 
    wait = true
    connection = false
  username=''
    constructor(){
        makeAutoObservable(this)
    }
    setConnection(connection){
 this.connection = connection
    }
    setWait(wait){
        runInAction(() => {
            this.wait = wait
          })
    }
   
    
}

export default new Socket ()