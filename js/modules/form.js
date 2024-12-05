// FORMULAIRE
import {  
    checkPasswordDifficulty,
    difficultyPw
} from "./pwCheck.js";

import { 
    nameValidator,
    emailValidator,
    passwordValidator
} from "./validators.js";
  
const form = document.getElementById("formulaire")
  
form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errors = [];
    const userData = {
    name: name,
    email: email,
    password: password,
    };
    // Data LocalStorage
    const users = JSON.parse(localStorage.getItem('userData')) ?? [];
  
    if (!nameValidator(name)) errors.push("Le nom d'utilisateur doit comporter au moins 3 caractères.");
    if (!emailValidator(email)) errors.push("L'email est invalide.");
    if (!passwordValidator(password)) errors.push("Le mot de passe doit contenir au moins 6 caractères, un chiffre et un caractère spécial.");
    if (password !== confirmPassword) errors.push("Les mots de passes ne sont pas identiques.")
    //User/Email unique
    if (users.some((user) =>user.name === name)) errors.push("Ce nom d'utilisateur est déja  utilisé");
    if (users.some((user) => user.email === email)) errors.push("Cet email est déjà utilisé.");
    
    //Erreurs
    const errorMessagesDiv = document.getElementById("errorMessages");
    if (errors.length > 0) {
      errorMessagesDiv.innerHTML = errors.join("<br>");
      errorMessagesDiv.style.color = "red";
      form.classList.add("shake");
      setTimeout(() => {
        form.classList.remove("shake");
      }, 1000);
    } else {
      //Validation
      users.push(userData)
      // Update
      localStorage.setItem('userData', JSON.stringify(users));
      errorMessagesDiv.style.color = "whitesmoke";
      errorMessagesDiv.textContent = "Inscription réussie !";
      setTimeout(() => {
        document.location.href="connexion.html";
      }, 1500);
      form.reset();
    }
});

// Security Password

document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const difficulty = checkPasswordDifficulty(password);
    difficultyPw(difficulty);
});


