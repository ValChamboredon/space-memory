const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0; // Nombre de cartes en paires


// Mélanger le deck
function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length); 
    card.style.order = randomPos; 
  });
};
shuffle();


// Fonction pour retourner la carte
function  flipCard() {
  
  if (lockBoard) return; 
  if (this === firstCard) return; 
 
  this.classList.add('flip'); // Retourner la carte dans le CSS
  
  if (!hasFlippedCard) {
    // Premier click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  if (firstCard.id === secondCard.id) {
  // Elles sont en paires donc => désactiver les cartes
  firstCard.removeEventListener('click', flipCard); 
  secondCard.removeEventListener('click', flipCard); 

  matchedCards++; 

  // Gagner
  if (matchedCards === cards.length/2) {
    setTimeout(() => {
      alert("Vous avez gagné !");
      console.log(compteur/2);
    }, 500); // Pour avoir le temps de voir la dernière carte se retourner
  }
  
  hasFlippedCard = false; 
  lockBoard = false; 
  firstCard = null; 
  secondCard = null; 
  } else {

  lockBoard = true; 
  setTimeout(() => {
    firstCard.classList.remove('flip'); 
    secondCard.classList.remove('flip'); 
    //Reset des variables
    hasFlippedCard = false; 
    lockBoard = false; 
    firstCard = null; 
    secondCard = null; 
  }, 2000);
  }
}

function keyPress(event) {
  if (event.code === 'Space') {
    cards.forEach(card => {
      card.classList.remove('flip'); // Retourne toutes les cartes face cachée
      card.addEventListener('click', flipCard); // Réactive les événements de clic
    });
    shuffle(); 
    matchedCards=0;
    hasFlippedCard = false; 
    lockBoard = false; 
    firstCard = null; 
    secondCard = null; 
  }
}

// Events click et keyPress
cards.forEach(card => card.addEventListener('click', flipCard));
document.addEventListener('keydown', keyPress);


