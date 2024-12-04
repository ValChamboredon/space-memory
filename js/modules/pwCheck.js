export function checkPasswordDifficulty(password) {
    const hasNumber = /\d/.test(password); 
    const hasSymbol = /[!@#$%^_&*]/.test(password); 
  
    if (password.length < 6) {
        return "faible";
    } else if (password.length > 6 && hasNumber && hasSymbol) {
        return "fort";
    } else if (password.length > 9 && hasNumber || hasSymbol) {
        return "moyen";
    }
    return "faible"; 
  }

export function difficultyPw(difficulty){
    switch (difficulty) {
        case "faible":
            passwordHelp.textContent = "Mot de passe : Faible";
            
            break;
        case "moyen":
            passwordHelp.textContent = "Mot de passe : Moyen";
            
            break;
        case "fort":
            passwordHelp.textContent = "Mot de passe : Fort";
            
            break;
        default:
            passwordHelp.textContent = "";
}}