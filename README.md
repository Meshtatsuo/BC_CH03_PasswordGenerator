# Password Generator

<b> Deployed with GitHub Pages: </b> https://meshtatsuo.github.io/BC_CH03_PasswordGenerator/

## Overview

This password generator prompts the user for a password length (between 8 and 128 characters), and then prompts for additional requirements such as upper case letter, lower case letter, number, and symbol. It then generates a password, validates that it meets requirements, and displays the password in the box.

<b>Note: This should NOT be used to generate actual passwords as it uses only pseudo random tools to generate!</b>

## Key Components

<ul>
<li> Password Requirements object that stores all requirements given by the user.</li>

<li> Character Set object that contains various character sets for us to pull random characters from</li>

<li>Password validation system that determines if the randomly generated password meets the user's requirements. If not, the system will generate a new one and revalidate.</li>
</ul>

## Preview
