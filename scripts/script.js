const cards = document.querySelectorAll('.memory-card');

//Reset
var count = 0; //variável contadora para realizar o reset
var restartElement = document.getElementById('restartButton'); //recebe o elemento referente ao botão
restartElement.style.display='none'; //define a visibilidade do botão para none

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
  
  count++;
  console.log(count);
  if(count == 6){
	restart();
  }
}

function restart() {
    restartElement.style.display='block'; //define a visibilidade do botão para block
    
    //https://www.30secondsofcode.org/css/s/mouse-cursor-gradient-tracking
    let btn = document.querySelector('.mouse-cursor-gradient-tracking');
    btn.addEventListener('mousemove', e => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
    });
    //-------------------------------------------------------------------------------------------------
    
    atictiveBlur();
    
    setTimeout(function() {
        window.location.reload();
    }, 6000);

}

function atictiveBlur() {
	var blur = document.getElementById('blur');
	blur.classList.toggle('active');
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
