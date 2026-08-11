  const resultElem = document.querySelector('.js-result');
  const scoreElem = document.querySelector('.js-score');
  const moveElem = document.querySelector('.js-move');

  let result = '';
  let computerImage= '';
  let playerImage= '';
  let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0,
      };

  function resetScore() {
    const resetButton = document.querySelector('.js-reset-button');
    const resetParagraph = document.querySelector('.js-reset-paragraph');

    const reset = () => {
     score.wins = 0;
     score.losses = 0;
     score.ties = 0;
     localStorage.removeItem('score');
    
     scoreElem.innerHTML= `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`
    }

    resetButton.addEventListener('click', () => {
     resetParagraph.innerHTML= `Are you sure <button class= "deletechoice"> Yes </button> <button class= "forgetchoice"> No </button>`;

     const agree = document.querySelector('.deletechoice');
     const disagree = document.querySelector('.forgetchoice');
     reset();
    });

    document.body.addEventListener('keydown', () => {
      if (event.key === 'Backspace') {
        reset();
      }});

  }
  resetScore();

  function autoPlay() {
    const autoPlayButton = document.querySelector('.js-autoplay-button');
    let timeout;

    const play = () => {
      clearInterval(timeout);
      
      timeout = setInterval(() => {
        const playerMove = compMove();
        gameMove(playerMove);
      }, 1000);
    }

    const stop = () => {
      clearInterval(timeout);
      autoPlayButton.removeEventListener('click',play);
    }

    const requirement = () => {
      if (autoPlayButton.innerHTML === 'Stop Playing') {
      autoPlayButton.innerHTML='Auto Play';
      stop();
    } else {
      autoPlayButton.innerHTML= 'Stop Playing';
      play();
    }}

    document.body.addEventListener('keypress' , (event) => {
      if (event.key === 'a') {
      requirement();
    }});

    autoPlayButton.addEventListener('click', () => {
      requirement();
    }); 
  }

  autoPlay();
   


  function gameMove(playerMove) {
     const computerMove = compMove();
    if (playerMove === 'Rock') {
      playerImage= '<img src="../IMAGES/rock-emoji.png" class="moveIcon">';
      if (computerMove === 'Rock') {
        resultElem.innerHTML = 'A tie';
      } else if (computerMove === 'Paper'){
         resultElem.innerHTML = 'You lose';
      } else if (computerMove === 'Scissors') {
        resultElem.innerHTML = 'You win';
      }
    } else if (playerMove === 'Scissors') {
      playerImage= '<img src="../IMAGES/scissors-emoji.png" class="moveIcon">';
      if (computerMove === 'Rock') {
        resultElem.innerHTML= 'You lose';
      } else if (computerMove === 'Paper') {
       resultElem.innerHTML ='You win';
      } else if (computerMove === 'Scissors'){
        resultElem.innerHTML ='A tie';
      }
    }
    else if (playerMove === 'Paper'){
      playerImage= '<img src="../IMAGES/paper-emoji.png" class="moveIcon">';
      if (computerMove === 'Rock') {
        resultElem.innerHTML ='You win';
      } else if (computerMove === 'Paper') {
        resultElem.innerHTML ='A tie';
      } else if (computerMove === 'Scissors') {
        resultElem.innerHTML ='You lose';
      }
   }

   if (resultElem.innerHTML === 'You win') {
     score.wins = score.wins +1;
     } else if (resultElem.innerHTML=== 'You lose') {
      score.losses = score.losses +1;
     } else if (resultElem.innerHTML === 'A tie') {
      score.ties = score.ties +1;
    } 


   localStorage.setItem('score', JSON.stringify(score));
  
   
   moveElem.innerHTML= `You ${playerImage} ${computerImage} Computer`
  
   scoreElem.innerHTML= `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`
 }

 

 
  function compMove() {
    let number = Math.random();
   if (number <= 1/3) {
    computerImage= '<img src="../IMAGES/rock-emoji.png" class="moveIcon">';
    return 'Rock';
   } else if (number <= 2/3 && number > 1/3) {
    computerImage= '<img src="../IMAGES/paper-emoji.png" class="moveIcon">';
    return 'Paper';
   } else if (number <= 1 && number > 2/3){ 
    computerImage= '<img src="../IMAGES/scissors-emoji.png"class="moveIcon">';
    return 'Scissors';
   }
  } 
    