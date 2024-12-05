const formLogin=document.getElementById("connexion")

formLogin.addEventListener("submit", (event) =>  {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData")); //Json to JS Json=string JS=tableau/objet
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    let userFound = false;  // Initialisation à false

    // Parcours tous les utilisateurs pour vérifier les informations
    for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
  
    // Validation
    if (loginEmail === user.email && loginPassword === user.password) {
    userFound = true;  
    validator();  
    break;  // On arrête la boucle dès qu'un utilisateur est trouvé
    }
    }
    // Aucun user 
    if (!userFound) errorText();
})

function errorText(){
  const loginInfos = document.getElementById("loginInfos");
  loginInfos.style.color = "red";
  loginInfos.textContent = "Email ou mot de passe incorrect.";
}

function validator() {
  loginInfos.style.color = "whitesmoke";
  loginInfos.textContent = "Connexion réussie !";
  setTimeout(() => {
    document.location.href = "jouer.html";  // Redirection après une connexion réussie
  }, 1500);
  formLogin.reset();
}
