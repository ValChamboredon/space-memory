const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let matchedCards = 0;
let count=0;
let lockBoard = false;
//Reset variables
function reset(){
    hasFlippedCard = false; 
    lockBoard = false; 
    firstCard = null; 
    secondCard = null;
}

// Mélanger le deck
function shuffle(){
    cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); 
    card.style.order = randomPos; 
    });
};
shuffle();

// Retourner les cartes
cards.forEach(card => card.addEventListener('click', flipCard));
function  flipCard() {
    if (lockBoard) return; 
    if (this === firstCard) return; 
    this.classList.add('flip'); 
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    secondCard = this;
    count++;
    document.getElementById("count").textContent=count  

    if (firstCard.id === secondCard.id) {
    firstCard.removeEventListener('click', flipCard); 
    secondCard.removeEventListener('click', flipCard); 

    // Victoire
    matchedCards++; 
    if (matchedCards === 6) {
      setTimeout(() => {
        alert("Bravo ! Vous avez gagné en " + count + " coups !");
      }, 500); // Avoir le temps de voir la carte flip
    }
    reset()
    } else {
      lockBoard = true; 
      setTimeout(() => {
        firstCard.classList.remove('flip'); 
        secondCard.classList.remove('flip'); 
        reset(); 
      }, 2000);
    }
}

// Reset space bar
document.addEventListener('keydown', keyPress);
function keyPress(event) {
    if (event.code === 'Space') {
      cards.forEach(card => {
        card.classList.remove('flip'); // Retourne toutes les cartes face cachée
        card.addEventListener('click', flipCard); // Réactive les événements de clic
     });
      shuffle(); 
      matchedCards=0;
      reset(); 
      count=0;
      document.getElementById("count").textContent=count 
    }
}







