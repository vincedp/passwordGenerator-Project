"use-strict";

const passwordOutput = document.querySelector(".input__text");

const includeUpper = document.querySelector(".rules__password--upper--input");

const includeLower = document.querySelector(".rules__password--lower--input");

const generatePasswordBtn = document.querySelector(".generate__pass--btn");

const copyBtn = document.querySelector(".input__btn");

const passwordLength = document.querySelector(
  ".rules__password--length--input"
);

const includeNumbers = document.querySelector(
  ".rules__password--numbers--input"
);

const includeSymbols = document.querySelector(
  ".rules__password--symbols--input"
);

passwordLength.value = 20;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = upperCase.toLowerCase();
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

const randomNum = (strLength) => Math.floor(Math.random() * strLength);

const getUpper = () => upperCase[randomNum(upperCase.length)];
const getLower = () => lowerCase[randomNum(lowerCase.length)];
const getNumber = () => numbers[randomNum(numbers.length)];
const getSymbol = () => symbols[randomNum(symbols.length)];

const randomFunc = {
  hasUpper: getUpper,
  hasLower: getLower,
  hasNumber: getNumber,
  hasSymbol: getSymbol,
};

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = passwordOutput.value;

  if (!password) {
    return alert("You must generate a password first");
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

const generatePassword = () => {
  const hasUpper = includeUpper.checked;
  const hasLower = includeLower.checked;
  const hasNumber = includeNumbers.checked;
  const hasSymbol = includeSymbols.checked;
  const length = +passwordLength.value;

  let finalPassword = "";

  const typesCount = hasUpper + hasLower + hasNumber + hasSymbol;

  if (typesCount === 0) return alert("Select checkbox to continue");

  const arr = [{ hasUpper }, { hasLower }, { hasNumber }, { hasSymbol }].filter(
    (item) => Object.values(item)[0]
  );

  for (let i = 0; i < length; i += typesCount) {
    arr.forEach(
      (type) => (finalPassword += randomFunc[Object.keys(type)[0]]())
    );
  }

  passwordOutput.value = finalPassword.slice(0, length);
};

generatePasswordBtn.addEventListener("click", generatePassword);
