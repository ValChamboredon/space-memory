// Function validators 

export function nameValidator(name) {
    return name.trim().length >= 3 
}
  
export function emailValidator(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
export function passwordValidator(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^_&*])(?=.{6,})/;
    return passwordRegex.test(password);
}

  