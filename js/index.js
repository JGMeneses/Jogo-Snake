const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElment = document.querySelector(".high-score");

let foodX , foodY;
let snakeX = 5, snakeY=10;
let velocityX = 0, velocityY = 0;
let bodySnake= [];
let gameOver = false;
let setintervalId;
let score=0;

// mostrando o maior score vindo do local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElment.innerText = `Maior Pontuação: ${highScore}`;

const changeFoodPosition = ()  =>{
    //passando um valor aleatorio para a posição da comida posicionada no tabuleiro de 0-30
    foodX =Math.floor(Math.random()*30) +1;
    foodY =Math.floor(Math.random()*30) +1;
}

handleGameOver = ()=>{
    clearInterval(setintervalId);
    alert("Você perdeu!! pressione OK para tentar outra vez...")
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}


const  initGame = () => {
    
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // checando a colisão entre a comida e a cabeça da cobra
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        bodySnake.push([foodX,foodY]); // adicionando a comida ao corpo da cobra
        score++;

        highScore  = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Pontuação: ${score}`;
    }

    //deslocando para frente os valores dos elementos no corpo da cobra em um
    for (let i = bodySnake.length -1; i > 0; i--) {
        bodySnake[i] = bodySnake[i-1];   
    }
    
    bodySnake[0] = [snakeX,snakeY];

    // Atuliza a cabeça da cobra baseado na velocidade
    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX >30 || snakeY <= 0 || snakeY >30 ){
        gameOver =true;
    }

    for (let i = 0; i < bodySnake.length; i++) {
        //adicionando corpo na cobra
        htmlMarkup += `<div class="head" style="grid-area: ${bodySnake[i][1]} / ${bodySnake[i][0]}"></div>`;
        //verificando se ela bateu no proprio corpo
        if(i !== 0 && bodySnake[0][1]  === bodySnake[i][1] && bodySnake [0][0] === bodySnake[i][0]){
            gameOver= true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setintervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);