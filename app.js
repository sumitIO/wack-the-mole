// QUERRY SELECTORS
const squares = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('.time-left')

var startButton = document.querySelector('.start-btn')
var stopButton = document.querySelector('.stop-btn')
var newGameButton = document.querySelector('.restart-btn')

let score = document.querySelector('.score')

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
newGameButton.addEventListener('click', restartGame);

let result = 0
let hitPosition
let currentTime = timeLeft.textContent

// COUNTER VARIABLES
let counter = null
let moleMover = null

// add EventListener to each Square
squares.forEach(item =>{
    item.addEventListener('click', ()=>{
        if(item.id === hitPosition){
            result += 1
        }
        score.textContent = result
    })
})
function removeMole(){
    // if mole is there already, remove it
    squares.forEach(className=>{
        className.classList.remove('mole');
    })
}

function randomSquare(){
    removeMole()
    let randomPosition = squares[Math.floor(Math.random()*9)]
    randomPosition.classList.add('mole')
    hitPosition = randomPosition.id
}

function countDown(){
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0){
        clearInterval(moleMover);
        clearInterval(counter);
        alert('Game Over! Score : ' + result );
        updateScoreBoard()
    }
}

function moveMole(){
    moleMover = setInterval(randomSquare, 1000)
}

function startGame(){
    // disable the start button to avoid overriding
    score.textContent = 0
    result = 0
    startButton.disabled = true;
    moveMole()
    // invoke countDown every second
    counter = setInterval(countDown, 1000)

}


function stopGame(){
    removeMole()
    if(moleMover != null){
        clearInterval(moleMover)
    }
    if(counter != null){
        clearInterval(counter)
    }
    // reset time
    timeLeft.textContent = 60;
    currentTime = timeLeft.textContent;
    // reset score
    score.textContent = 0
    result = 0
    startButton.disabled = false;
}

function restartGame(){
    stopGame()
    startGame()
}


function updateScoreBoard(){
    var wrapper = document.querySelector('.score-table')

    var div = document.createElement('DIV')
    div.innerText = result
    div.setAttribute('class', 'score-board')    
    wrapper.appendChild(div)
}