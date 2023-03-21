const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'blue', 'yellow', 'purple', 'green', 'cyan', 'magenta', 'lightblue']
let time=0
let score=0

startBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('time-btn')){
        time=parseInt(e.target.getAttribute('data-time'))
        console.log(e.target.getAttribute('data-time'))
        console.log(time)
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click',(e)=>{
    if(e.target.classList.contains('circle')){
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    
    setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML=`<h1>Score: <span class="primary">${score}</span></h1>`
}

function decreaseTime(){
    if(time===0){
        finishGame()
    } else {
        let current = --time
        setTime(current)
    }
}

function setTime(value){
    if(value<10){
        value=`0${value}`
    }
    timeEl.innerHTML=`00:${value}`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height}=board.getBoundingClientRect()
    const x=getRandomNumber(0, width-size)
    const y=getRandomNumber(0, height-size)
    circle.classList.add('circle')
    circle.style.width=`${size}px`
    circle.style.height=`${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`
    const color = getRandomColor()
    circle.style.background=color
    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min)+min)    
}

function getRandomColor(){
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}