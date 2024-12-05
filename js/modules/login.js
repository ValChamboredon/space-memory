const formLogin=document.getElementById("connexion")

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData")); 
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    let userFound = false; 

    //Parcourir user list
    for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
  
    // Validation
    if (loginEmail === user.email && loginPassword === user.password) {
    userFound = true;  
    validator();  
    break; 
    }
    }
    // Aucun user 
    if (!userFound) errorText();
    
})

function errorText(){
    const loginInfos = document.getElementById("loginInfos");
    loginInfos.style.color = "red";
    loginInfos.textContent = "Email ou mot de passe incorrect.";
    document.getElementById("connexion").classList.add("shake");
    setTimeout(() => {
      loginInfos.classList.remove("shake");
    }, 1000);
}

function validator() {
    loginInfos.style.color = "whitesmoke";
    loginInfos.textContent = "Connexion réussie !";
    setTimeout(() => {
      document.location.href = "jouer.html"; 
    }, 1500);
    formLogin.reset();
}
