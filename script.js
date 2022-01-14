// Password requirement object. All requirements set to true by default.

let attempt = 1;
// Limit the number of loops the code attempts to make while generating a valid password to prevent hanging.
let maxAttempts = 100;

// Requirements are made by the user
let passwordReqs = {
  length: 15,
  haveUpper: true,
  haveLower: true,
  numberRequired: true,
  specialCharactersRequired: true,
};
// Create character sets for each type to randomly pull from
let randomCharset = {
  // If requires upper, lower, numbers, and symbols
  fullCharset:
    ":>?<,./;=-`~!@#$%^&*_+}{0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  //if requires only letters
  lettersOnly: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  //symbol charset for validation
  symbolsOnly: ":>?<,./;=-`~!@#$%^&*_+}{",
  //if requires letters and numbers
  lettersAndNumbers:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  //if requires letters and symbols
  lettersAndSymbols:
    ":>?<,./;=-`~!@#$%^&*_+}{ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
};

// global max and min length variables for password length
let lengthMax = 128;
let lengthMin = 8;

// General prompt user function to return a true or false statement
function promptUser(requirement) {
  let response = "";
  switch (requirement) {
    case "length":
      while (!response) {
        response = window.prompt(
          "How long should the password be? (Enter number between 8 and 128"
        );
      }
      if (
        parseInt(response) &&
        lengthMin <= parseInt(response) &&
        parseInt(response) <= lengthMax
      ) {
        return response;
      } else {
        alert(
          "Please enter a value between " + lengthMin + " and " + lengthMax
        );
        promptUser(requirement);
      }

    case "upper":
      while (!response) {
        response = window.prompt(
          "Should this password have upper case letters? (yes or no)"
        );
      }

      response = response.toUpperCase();
      if (response === "YES" || response === "NO") {
        break;
      } else if (response !== "YES" && response !== "NO") {
        alert("Please enter 'yes' or 'no'.");
        promptUser(requirement);
      }
      return response;

    case "lower":
      while (!response) {
        response = window.prompt(
          "Should this password have lower case letters? (yes or no)"
        );
      }
      response = response.toUpperCase();
      if (response === "YES" || response === "NO") {
        break;
      } else if (response !== "YES" && response !== "NO") {
        alert("Please enter 'yes' or 'no'.");
        promptUser(requirement);
      }
      return response;

    case "numeric":
      while (!response) {
        response = window.prompt(
          "Should this password have numbers? (yes or no)"
        );
      }
      response = response.toUpperCase();
      if (response === "YES" || response === "NO") {
        break;
      } else if (response !== "YES" && response !== "NO") {
        alert("Please enter 'yes' or 'no'.");
        promptUser(requirement);
      }
      return response;

    case "special":
      while (!response) {
        debugger;
        response = window.prompt(
          "Should this password have special characters? (yes or no)"
        );
        response = response.toUpperCase();
        if (response === "YES" || response === "NO") {
          break;
        } else if (response !== "YES" && response !== "NO") {
          alert("Please enter 'yes' or 'no'.");
          promptUser(requirement);
        }
      }
      return response;
  }
}

// Prompts user and sets password requirements
function determineRequirements() {
  //Receive requirements from the user
  attempt = 1;

  // Receive length requirement and add it to requirements object
  let response = promptUser("length");
  if (response) {
    passwordReqs.length = parseInt(response);
  }

  // Receive upper case requirement
  response = promptUser("upper");
  if (response === "YES") {
    passwordReqs.haveUpper = true;
  } else if ((response = "NO")) {
    passwordReqs.haveUpper = false;
  }
  // Receive lower case requirement
  response = promptUser("lower");
  if (response === "YES") {
    passwordReqs.haveLower = true;
  } else if (response === "NO") {
    passwordReqs.haveLower = false;
  }

  //receive numerical requirement
  response = promptUser("numeric");
  if (response === "YES") {
    passwordReqs.numberRequired = true;
  } else if (response === "NO") {
    passwordReqs.numberRequired = false;
  }
  // Receive special characters requirement
  response = promptUser("special");
  if (response === "YES") {
    passwordReqs.specialCharactersRequired = true;
  } else if (response === "NO") {
    passwordReqs.specialCharactersRequired = false;
  }

  writePassword();
}

// Generates a randomly generated password pulling from the appropriate character set
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
    }
  } else {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.lettersAndNumbers[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.lettersAndNumbers.length)
        ];
    }
  }

  return generatedPassword;
}

// Removes upper or lower case characters based on password requirements
function validateLetterCase(generatedPassword) {
  // uppercase all values in password if required
  if (passwordReqs.haveUpper && !passwordReqs.haveLower) {
    generatedPassword = generatedPassword.toUpperCase();
  }
  // lowercase all values in password if required
  else if (!passwordReqs.haveUpper && passwordReqs.haveLower) {
    generatedPassword = generatedPassword.toLowerCase();
  }

  return generatedPassword;
}

// Validates the generated password based on password requirements
function validatePassword(generatedPassword) {
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

  // if the two objects are equal in value, then the password is validated.
  if (
    candidateLength == passwordReqs.length &&
    upperIsValid == passwordReqs.haveUpper &&
    lowerIsValid == passwordReqs.haveLower &&
    numberIsValid == passwordReqs.numberRequired &&
    symbolIsValid == passwordReqs.specialCharactersRequired
  ) {
    return candidate;
  } else {
    return null;
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");
  var password = generatePassword();
  //using "join" removes the "," that separate each item in the array
  let validated = validatePassword(password.join(""));
  //if password validates, enter password into text field
  if (validated) {
    // update text in textbox to generated value and log the number of attempts
    console.log("attempt: " + attempt);
    passwordText.value = validated;
  }
  //if password fails to validate, generate a new password
  else {
    console.log("ERROR. PASSWORD INVALID. ATTEMPT: " + attempt);
    attempt += maxAttempts;
    if (attempt <= 1) {
      writePassword();
    } else {
      // If too many attempts were made, spit out an error and ask user to try again
      console.log("Failed after " + attempt + " attempts.");
      passwordText.value = "ERROR! Please Try Again!";
    }
  }
}

// Add event listener to generate button, calling the determineRequirements function.
// NOTE: changed function that the event listener calls so that we can recall the writePassword function again when needed
generateBtn.addEventListener("click", determineRequirements);
