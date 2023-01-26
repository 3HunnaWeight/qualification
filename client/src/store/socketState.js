import { makeAutoObservable } from "mobx";

class Socket{
    connection = false
  socket = null
  sessionid = null
  username=''
    constructor(){
        makeAutoObservable(this)
    }
    setSocket(socket){
        this.socket = socket
    }
    setSessionId(id) {
        this.sessionid = id
    }
    setConnection(connection){
 this.connection = connection
    }
}

export default new Socket ()