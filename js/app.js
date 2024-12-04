const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;
let count=0;

//Reset des variables
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

// Fonction pour retourner la carte
function  flipCard() {
  if (lockBoard) return; 
  if (this === firstCard) return; 
  this.classList.add('flip'); // Ajoute class html donc modifie le css  
  if (!hasFlippedCard) {
    // Premier click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  count++;
  document.getElementById("count").textContent=count  

  if (firstCard.id === secondCard.id) {
  // Elles sont en paires donc => désactiver les cartes
  firstCard.removeEventListener('click', flipCard); 
  secondCard.removeEventListener('click', flipCard); 

  matchedCards++; 

  // Victoire
  if (matchedCards === 6) {
    setTimeout(() => {
      alert("Bravo ! Vous avez gagné en " + count + " coups !");
    }, 500); // Pour avoir le temps de voir la dernière carte se retourner
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

// Events click et keyPress
cards.forEach(card => card.addEventListener('click', flipCard));
document.addEventListener('keydown', keyPress);

// FORMULAIRE

// Main function
import { 
  nameValidator,
  emailValidator,
  passwordValidator
 } from "./modules/validators.js";

document.getElementById("formulaire").addEventListener("submit", (event) => {
  event.preventDefault(); 

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  console.log(name,email,password,confirmPassword);

  const errors = [];
  
  const userData = {
    name: name,
    email: email,
    password: password,
  };
  // Prends en compte les datas déja existantes ou non du localStorage
  const users = JSON.parse(localStorage.getItem('userData')) ?? [];
 
  if (!nameValidator(name)) errors.push("Le nom d'utilisateur doit comporter au moins 3 caractères.");
  //User unique
  if (users.some((user) =>user.name === name)) {
    errors.push("Ce nom d'utilisateur est déja  utilisé");
  }
  if (!emailValidator(email)) errors.push("L'email est invalide.");
  //Email unique
  if (users.some((user) => user.email === email)) {
  errors.push("Cet email est déjà utilisé.");
  }
  if (!passwordValidator(password)) errors.push("Le mot de passe doit contenir au moins 6 caractères, un chiffre et un caractère spécial.");
  if (password !== confirmPassword) errors.push("Les mots de passes ne sont pas identiques")

  const errorMessagesDiv = document.getElementById("errorMessages");

  if (errors.length > 0) {
    errorMessagesDiv.innerHTML = errors.join("<br>");
  } else {
  
  users.push(userData)
  // Update
  localStorage.setItem('userData', JSON.stringify(users));
    
  errorMessagesDiv.style.color = "whitesmoke";
  errorMessagesDiv.textContent = "Inscription réussie !";
     
  setTimeout(() => {
    document.location.href="connexion.html";
  }, 1500);

    document.getElementById("formulaire").reset();
}
});

// Security Password
import {  
  checkPasswordDifficulty,
  difficultyPw
} from "./modules/pwCheck.js";

document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const difficulty = checkPasswordDifficulty(password);
  difficultyPw(difficulty);
});





