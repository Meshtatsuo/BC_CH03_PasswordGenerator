// Password requirement object. All requirements set to true by default.

let attempt = 1;

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
  symbolsAndNumbers: ":>?<,./;=-`~!@#$%^&*_+}{0123456789",
  numbers: "0123456789",
};

// global max and min length variables for password length
let lengthMax = 128;
let lengthMin = 8;

// Prompt user for password length, determine if it meets requirements, then returns
function requestPasswordLength() {
  let response = "";
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
    alert("Please enter a value between " + lengthMin + " and " + lengthMax);
    requestPasswordLength();
  }
}

// Prompts user and sets password requirements
function determineRequirements() {
  //Receive requirements from the user
  attempt = 1;

  // Receive length requirement and add it to requirements object
  let response = requestPasswordLength();
  if (response) {
    passwordReqs.length = parseInt(response);
  }

  // Receive upper case requirement
  passwordReqs.haveUpper = confirm(
    "Press 'OK' to confirm upper case letter requirement, otherwise press 'CANCEL'"
  );

  // Receive lower case requirement
  passwordReqs.haveLower = confirm(
    "Press 'OK' to confirm lower case letter requirement, otherwise press 'CANCEL'"
  );

  //receive numerical requirement
  passwordReqs.numberRequired = confirm(
    "Press 'OK' to confirm number requirement, otherwise press 'CANCEL'"
  );

  // Receive special characters requirement
  passwordReqs.specialCharactersRequired = confirm(
    "Press 'OK' to confirm symbol requirement, otherwise press 'CANCEL'"
  );

  writePassword();
}

// Generates a randomly generated password pulling from the appropriate character set
function generatePassword() {
  let generatedPassword = [];

  //If all false, prompt user that we need *some* requirements!
  if (
    passwordReqs.specialCharactersRequired === false &&
    passwordReqs.numberRequired === false &&
    passwordReqs.haveUpper === false &&
    passwordReqs.haveLower === false
  ) {
    alert("We need SOME requirements if you want a password! Try again.");
    determineRequirements();
  }
  //If all true, pull from full char set
  else if (
    passwordReqs.specialCharactersRequired === true &&
    passwordReqs.numberRequired === true &&
    passwordReqs.haveUpper === true &&
    passwordReqs.haveLower === true
  ) {
    //Pull from full character set if all are required
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.fullCharset[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.fullCharset.length)
        ];
    }
  }
  // User letters only if no numbers or symbols wanted
  else if (
    passwordReqs.specialCharactersRequired === false &&
    passwordReqs.numberRequired === false &&
    (passwordReqs.haveUpper === true || passwordReqs.haveLower === true)
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.lettersOnly[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.lettersOnly.length)
        ];
    }
  }
  // Pull from letters and symbols if numbers aren't required
  else if (
    passwordReqs.specialCharactersRequired === true &&
    passwordReqs.numberRequired === false &&
    (passwordReqs.haveUpper === true || passwordReqs.haveLower === true)
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.lettersAndSymbols[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.lettersAndSymbols.length)
        ];
    }
  }
  // Pull from numbers and symbols if no letters required
  else if (
    passwordReqs.specialCharactersRequired === true &&
    passwordReqs.numberRequired === true &&
    passwordReqs.haveUpper === false &&
    passwordReqs.haveLower === false
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.symbolsAndNumbers[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.symbolsAndNumbers.length)
        ];
    }
  }
  // Pull from numbers Only
  else if (
    passwordReqs.specialCharactersRequired === false &&
    passwordReqs.numberRequired === true &&
    passwordReqs.haveUpper === false &&
    passwordReqs.haveLower === false
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.numbers[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.numbers.length)
        ];
    }
  }
  // Pull from symbols only
  else if (
    passwordReqs.specialCharactersRequired === true &&
    passwordReqs.numberRequired === false &&
    passwordReqs.haveUpper === false &&
    passwordReqs.haveLower === false
  ) {
    for (let i = 0; i < passwordReqs.length; i++) {
      generatedPassword[i] =
        randomCharset.symbolsOnly[
          // Find random character in the full character set
          Math.floor(Math.random() * randomCharset.symbolsOnly.length)
        ];
    }
  }
  // Otherwise letters and numbers are required, but no symbols. pull from letters and numbers
  else {
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
    console.log("Password validated after " + attempt + " attempts.");
    passwordText.value = validated;
  }
  //if password fails to validate, generate a new password
  else {
    attempt += 1;
    writePassword();
  }
}

// Add event listener to generate button, calling the determineRequirements function.
// NOTE: changed function that the event listener calls so that we can recall the writePassword function again when needed
generateBtn.addEventListener("click", determineRequirements);
