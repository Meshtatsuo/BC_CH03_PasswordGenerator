// Password requirement object. All requirements set to true by default.
let passwordReqs = {
  length: 15,
  haveUpper: true,
  haveLower: true,
  numberRequired: true,
  specialCharactersRequired: true,
};
// Create character sets for each type to randomly pull from
let randomCharset = {
  fullCharset:
    ":>?<,./;=-`~!@#$%^&*_+}{0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  lettersOnly: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  symbolsOnly: ":>?<,./;=-`~!@#$%^&*_+}{",
  lettersAndNumbers:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  lettersAndSymbols:
    ":>?<,./;=-`~!@#$%^&*_+}{ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
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
    passwordReqs.haveUpper = true;
  } else if ((response = "NO")) {
    passwordReqs.haveUpper = false;
  } else {
    window.alert("You entered an invalid response. Please try again.");
    generatePassword();
  }

  // Receive lower case requirement
  response = promptUser("lower");
  if (response === "YES") {
    passwordReqs.haveLower = true;
  } else if (response === "NO") {
    passwordReqs.haveLower = false;
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
  let generatedPassword = [];

  //Generate random string of lowercase letters to start

  if (
    passwordReqs.specialCharactersRequired === true &&
    passwordReqs.numberRequired === true
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.fullCharset[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.fullCharset.length)
        ];

      console.log(generatedPassword[i]);
    }
  } else if (
    passwordReqs.specialCharactersRequired === false &&
    passwordReqs.numberRequired === false
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.lettersOnly[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.lettersOnly.length)
        ];

      console.log(generatedPassword[i]);
    }
  } else if (
    passwordReqs.specialCharactersRequired === true &&
    passwordReqs.numberRequired === false
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.lettersAndSymbols[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.lettersAndSymbols.length)
        ];

      console.log(generatedPassword[i]);
    }
  } else {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.lettersAndNumbers[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.lettersAndNumbers.length)
        ];

      console.log(generatedPassword[i]);
    }
  }

  return generatedPassword;
}

function validateLetterCase(generatedPassword) {
  // uppercase all values in password if required
  if (passwordReqs.haveUpper && !passwordReqs.haveLower) {
    generatedPassword = generatedPassword.toUpperCase();
  }
  // lowercase all values in password if required
  else if (!passwordReqs.haveUpper && passwordReqs.haveLower) {
    generatedPassword = generatedPassword.toLowerCase();
  }

  console.log(generatedPassword);
  return generatedPassword;
}

function validatePassword(generatedPassword) {
  debugger;
  let candidate = validateLetterCase(generatedPassword);
  // Testing variables
  let character = "";
  let candidateLength = candidate.length;
  let upperIsValid = false;
  let lowerIsValid = false;
  let numberIsValid = false;
  let symbolIsValid = false;

  // Check for upper case letters
  for (let i = 0; i <= candidate.length - 1; i++) {
    character = candidate.charAt(i);
    // check for upper case letter
    if (
      character === character.toUpperCase() &&
      randomCharset.lettersOnly.includes(character)
    ) {
      upperIsValid = true;
      console.log("Validation: Upper case letter found.");
    }
    // Check  for lower case letter
    else if (
      character === character.toLowerCase() &&
      randomCharset.lettersOnly.includes(character)
    ) {
      lowerIsValid = true;
      console.log("Validation: Lower case letter found.");
    }
    // check for number
    // soft validation as we don't need  type equal, just that value is equal
    else if (character == parseInt(character)) {
      numberIsValid = true;
      console.log("Validation: Number found.");
    }
    // Use symbol character set to check for symbol.
    else if (randomCharset.symbolsOnly.includes(character)) {
      symbolIsValid = true;
      console.log("validation: Symbol found.");
    }
  }

  console.log(candidate.length);
  console.log(passwordReqs.length);
  // if the two objects are equal in value, then the password is validated.
  if (
    candidateLength == passwordReqs.length &&
    upperIsValid == passwordReqs.haveUpper &&
    lowerIsValid == passwordReqs.haveLower &&
    numberIsValid == passwordReqs.numberRequired &&
    symbolIsValid == passwordReqs.specialCharactersRequired
  ) {
    return candidate;
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  determineRequirements();
  var password = generatePassword();
  //using "join" removes the "," that separate each item in the array. This should prevent validator from seeing symbols in non symbol passwords.
  let validated = validatePassword(password.join(""));
  if (validated) {
    var passwordText = document.querySelector("#password");
    //using "join" removes the "," that separate each item in the array
    passwordText.value = validated;
  } else {
    console.log("ERROR. PASSWORD INVALID");
    generatePassword();
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
