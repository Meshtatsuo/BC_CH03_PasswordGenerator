// Password requirement object. All requirements set to true by default.
let passwordReqs = {
  length: 15,
  upperRequired: true,
  lowerRequired: true,
  numberRequired: true,
  specialCharactersRequired: true,
};

let lenghtMax = 128;
let lengthMin = 8;

function promptUser(requirement) {
  let response = "";
  switch (requirement) {
    case "length":
      response = window.prompt(
        "How long should the password be? (Enter number between 8 and 128"
      );
      return response;

    case "upper":
      response = window.prompt(
        "Should this password have upper case letters? (yes or no)"
      );
      response = response.toUpperCase();
      return response;

    case "lower":
      response = window.prompt(
        "Should this password have lower case letters? (yes or no)"
      );
      response = response.toUpperCase();
      return response;

    case "numeric":
      response = window.prompt(
        "Should this password have numbers? (yes or no)"
      );
      response = response.toUpperCase();
      return response;

    case "special":
      response = window.prompt(
        "Should this password have special characters? (yes or no)"
      );
      response = response.toUpperCase();
      return response;
  }
}

function determineRequirements() {
  //Receive requirements from the user

  // Receive length requirement and add it to requirements object
  let response = promptUser("length");
  if (
    parseInt(response) &&
    parseInt(response) >= 8 &&
    parseInt(response) <= 128
  ) {
    passwordReqs.length = parseInt(response);
  } else {
    window.alert("You entered an invalid response. Please try again.");
    generatePassword();
  }

  // Receive upper case requirement
  response = promptUser("upper");
  if (response === "YES") {
    passwordReqs.upperRequired = true;
  } else if ((response = "NO")) {
    passwordReqs.upperRequired = false;
  } else {
    window.alert("You entered an invalid response. Please try again.");
    generatePassword();
  }

  // Receive lower case requirement
  response = promptUser("lower");
  if (response === "YES") {
    passwordReqs.lowerRequired = true;
  } else if (response === "NO") {
    passwordReqs.lowerRequired = false;
  } else {
    window.alert("You entered an invalid response. Please try again.");
    generatePassword();
  }
  //receive numerical requirement
  response = promptUser("numeric");
  if (response === "YES") {
    passwordReqs.numberRequired = true;
  } else if (response === "NO") {
    passwordReqs.numberRequired = false;
  } else {
    window.alert("You entered an invalid response. Please try again.");
    generatePassword();
  }
  // Receive special characters requirement
  response = promptUser("special");
  if (response === "YES") {
    passwordReqs.specialCharactersRequired = true;
  } else if (response === "NO") {
    passwordReqs.specialCharactersRequired = false;
  } else {
    window.alert("You entered an invalid response. Please try again.");
    generatePassword();
  }

  console.log(passwordReqs);
}

function generatePassword() {
  // determineRequirements();

  let generatedPassword = [];

  //Generate random string of lowercase letters to start
  for (let i = 0; i < passwordReqs.length; i++) {
    generatedPassword[i] = Math.random().toString(36).substring(2, 3);
    console.log(generatedPassword[i]);
  }
  generatedPassword.join("");
  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  //using "join" removes the "," that separate each item in the array
  passwordText.value = password.join("");
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
