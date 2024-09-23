let rulesButton = document.getElementById("rules-button");
let closeButton = document.getElementById("close-button");
let popupContainer = document.getElementById("popup-container");
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let playerChoiceImg = document.getElementById("user-choice-img")
let computerChoiceImg = document.getElementById("computer-choice-img")
let userChoiceImg = document.getElementById("user-choice-img")
const choice = ["rock","paper","scissors"]
let resultText = document.getElementById("result-text")
let playAgain = document.getElementById("play-again")
let playAgain2 = document.getElementById("play-again-2")
let againstPc = document.getElementById("against-pc")
let resultContainer = document.getElementById("result-container")
let container2 = document.getElementById("game-container")
let wrapperDiv2 = document.getElementById("hidden-container")
let nextBtn = document.getElementById('next-button');
let rulesBtn = document.getElementById('rules-button');
let circleContainer1 = document.getElementById("circle-container-1");
let circleContainer2 = document.getElementById("circle-container-2");
let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

document.getElementById('computer-score').innerHTML = computerScore;
document.getElementById('your-score').innerHTML = playerScore;


rulesButton.addEventListener('click',()=>{
    popupContainer.style.display = "block";
});
closeButton.addEventListener('click',()=>{
    popupContainer.style.display = "none";
});
nextBtn.addEventListener('click',()=>{
    window.location.href = "hurray.html";
})
function computerChoice(){
    const computerResult = choice[Math.floor(Math.random() * choice.length)];
    return computerResult;
}
playAgain.addEventListener('click', function() {
    container2.style.display = "block";
    wrapperDiv2.style.display = "none";
    nextBtn.style.display = 'none';
    rulesBtn.style.right = '20px'; 
  });
function getWinner(userChoice,computerChoice){

    circleContainer1.classList.remove('ripple-effect');
    circleContainer2.classList.remove('ripple-effect');

    if(userChoice === computerChoice){
        resultText.innerHTML = "TIE UP";
        againstPc.innerHTML = "";

        return "Draw";
    }else if((userChoice === "rock" && computerChoice === "scissors") || (userChoice === "paper" && computerChoice === "rock") ||(userChoice === "scissors" && computerChoice === "paper")){
        againstPc.innerHTML = "AGAINST PC";
        playerScore ++;
        localStorage.setItem('playerScore', playerScore);
        document.getElementById('your-score').innerHTML = playerScore;
        resultText.innerHTML = "YOU WIN";
        circleContainer1.classList.add('ripple-effect')
        return "User's Win"
    }
    else{
        againstPc.innerHTML = "AGAINST PC";
        computerScore ++;
        localStorage.setItem('computerScore', computerScore); 
        document.getElementById('computer-score').innerHTML = computerScore;
        resultText.innerHTML = "YOU LOST";
        circleContainer2.classList.add('ripple-effect')
        return "Computer's Win"
    }
}
function showResultContainer() {
    container2.style.display = 'none';
    wrapperDiv2.style.display = 'block';
  }
function playGame(userChoice){
    let computerchoice = computerChoice();
    let result = getWinner(userChoice,computerchoice);
    if(result === "User's Win"){
        nextBtn.style.display = "inline-block";
        rulesBtn.style.right = '130px'; 
    }
    playerChoiceImg.src = getIconForUser(userChoice);
    computerChoiceImg.src = getIconForComputer(computerchoice);
    console.log(result)
}
rock.addEventListener('click',()=>{
    showResultContainer();
    playGame("rock");
})
paper.addEventListener('click',()=>{
    showResultContainer();
    playGame("paper");
})
scissors.addEventListener('click',()=>{
    showResultContainer();
    playGame("scissors");
})
function getIconForUser(Userchoice){
    if (Userchoice === 'rock'){
        document.getElementById('player-choice-circle').style.borderColor = "#0074B6"
        return "images/stone.png"
    }
    if (Userchoice === 'paper'){
        document.getElementById('player-choice-circle').style.borderColor = "#FFA943"
        return "images/paper.png"
    }
    if (Userchoice === 'scissors'){
        document.getElementById('player-choice-circle').style.borderColor = "#BD00FF"
        return "images/scissors.png"
    }
    
}
function getIconForComputer(Computerchoice){
    if (Computerchoice === 'rock'){
        document.getElementById('computer-choice-circle').style.borderColor = "#0074B6"
        return "images/stone.png"
    }
    if (Computerchoice === 'paper'){
        document.getElementById('computer-choice-circle').style.borderColor = "#FFA943"
        return "images/paper.png"
    }
    if (Computerchoice === 'scissors'){
        document.getElementById('computer-choice-circle').style.borderColor = "#BD00FF"
        return "images/scissors.png"
    }
    
}