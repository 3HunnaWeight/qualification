export const gameLogicFunction = (messages,words,setState,setWords,setPaint,clear,playersState,getBonusImport,paint,endGameImport) =>{
    messages.map(mess=>{
        words.map(word=>{
            if(mess.message===word.someWord){
                messages.map(user=>{
                    if(mess.uniqueName==user.uniqueName){
                        setState(prev=>prev+1);setWords([]);setPaint(false);clear();playersState.setBonusScore(true);
                    }
                }
            )}
        })
    })
    messages.map(mess=>{
        words.map(word=>{
            if(mess.message===word.someWord){
                messages.map(user=>{
                    if(mess.uniqueName==user.uniqueName){
                        playersState.setWinner(mess.username)
                    }
                })
            }
        })
    })
    messages.map(mess=>{
        words.map(word=>{
            if(mess.message===word.someWord){
                messages.map(user=>{
                    if(mess.uniqueName==user.uniqueName){
                        playersState.setTimer(false)
                    }
                })
            }
        })
    })
    messages.map(mess=>{
        words.map(word=>{
            if(mess.message===word.someWord){
                messages.map(user=>{
                    if(mess.uniqueName==user.uniqueName){
                        playersState.setTimeIsOver(false)
                    }
                })
            }
        })
    })
    messages.map(mess=>{
        words.map(word=>{
            if(mess.message===word.someWord){
                messages.map(user=>{
                    if(mess.uniqueName==user.uniqueName){
                        playersState.setWinnerWord(word.someWord)
                    }
                })
            }
        })
    })
    messages.map(mess=>{
        words.map(word=>{
            if(mess.message===word.someWord){
                messages.map(user=>{
                    if(mess.uniqueName==user.uniqueName&&paint){getBonusImport();}
                })
            }
        })
    }) 
    messages.map(user=>{
        if(user.score>=20){
            endGameImport()
        }
    })
}