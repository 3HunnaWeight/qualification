 import {runInAction, makeAutoObservable } from "mobx";

class Player{
  words=["Крокодил","Слон","Шампунь","Телефон","Дуэль","Домофон","Компьютер","Музыкант","Футбол","Баскетбол","Лыжи","Озеро","Виноград","Сокровище","Мамонт","Клад","Маска","Газ","Хакер","Алкоголик","Актер","Вагон","Вакцина","Валюта","Бугай","Вор","Ведьма","Вампир", "Ведьмак", "Бандит", "Бар", "Батискаф","Лудоман","Сделка","Шрек","Кастинг","Кардиолог","Маньяк","Пазлы","Аниме","Рыбалка","Мафия","Геймер","Папич","Дота","Наклейка","Борец","Жена","Кошмар","Сон","Русалка","Клей","Сосулька","Демон","Гарем","Пожарник","Снегурочка","Кентавр","Блеф","Покер","Танкист","Акушер","Супергерой","Юрист","Программист","Граффити","Космонавт","Браузер","Мармелад","Иностранец","Боксер","Бойцовский клуб","Контрабанда","Трансформер","Халк","Команда","Горилла","Художник","Наркоман","Лихорадка","Маникен","Вафли","Ковер","Кошелек","Трава","Камни","Погода","Ноги","Голова","Губы","Ногти","Зубы","Потолок","Тесак","Зеркало","Лавина","Робот","Секта","Пират","Скорость","Жаба","Бегемот","Слон","Медуза","Пин","Смешарики","Лунтик","Нюша","Базука","Стеройды","Украшение","Город","Мультик","Перестрелка","Гетто","Торговля","Ограбление","Мышеловка","Ниндзя","Белый","Шторм","Дух","Интелект","Ловкость","Сила","Утконос","Гладиатор","Кимано","Ватрушка","Санки","Павлин","Фабрика","Товар","Трофей","Текст","Червяк","Завод","Депрессия","Диск","Паровоз","Карлсон","Какао","Закон","Душ","Гриб","Африка","Андрей","Солевой","Грамм","Килограмм","Хобби","Клоп","Циклоп","Троль","Партер","Нолик","Симка","Наруто","Медведь","Бит","Гигабайт","Терабайт","Мегабайт","Гидра","Терминал","Зажигалка","Лунатик","Звездопад","Ток","Интернет","Цербер","Зевс","Арена",""]
  show = true
  toggle = false
  winner = null
  modal = false
  winnerWord = null
  paint = false
  timeIsOver = false
  timer = false
  width = null
  color = null
  end = false
  connectCounter = null
  bonusScore = true
  players = 0 
    constructor(){
        makeAutoObservable(this)
        this.players = 0
       console.log(this.words.length)
    }
    setUsername(username){
      this.username = username
    }

    setConnectCounter(value){
      runInAction(()=>{
        this.connectCounter=value
      })
    }
    setPlayers(value){
      runInAction(()=>{
        this.players=value
      })
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
    setEnd(end){
      runInAction(()=>{
        this.end=end
      })
    }
    setWinner(winner){
      runInAction(()=>{
        this.winner=winner
      })
    }
    setWinnerWord(winnerWord){
      runInAction(()=>{
        this.winnerWord=winnerWord
      })
    }
    setModal(modal){
      runInAction(()=>{
        this.modal=modal
      })
    }
    setPaint(value){
      runInAction(()=>{
        this.paint=value
      })
    }
    setTimeIsOver(time){
      runInAction(()=>{
        this.timeIsOver=time
      })
    }
    setTimer(time){
      runInAction(()=>{
        this.timer=time
      })
    }
    setWidth(width){
      runInAction(()=>{
        this.width=width
      })
    }
    setCurrentColor(color){
      runInAction(()=>{
        this.color=color
      })
    }
    setBonusScore(value){
      runInAction(()=>{
        this.bonusScore=value
      })
    }
  }
  


export default new Player()
