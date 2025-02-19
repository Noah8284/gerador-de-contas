const usernameEl = document.getElementById("username");
const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getRandomChar(set) {
  return set[Math.floor(Math.random() * set.length)];
}

function generateUsername() {
  const chars = lowerLetters + upperLetters + numbers;
  let username = "";
  const length = 10;

  for (let i = 0; i < length; i++) {
    username += getRandomChar(chars);
  }

  return username;
}

function generatePassword() {
  const len = lenEl.value;
  let password = "";

  if (upperEl.checked) password += getRandomChar(upperLetters);
  if (lowerEl.checked) password += getRandomChar(lowerLetters);
  if (numberEl.checked) password += getRandomChar(numbers);
  if (symbolEl.checked) password += getRandomChar(symbols);

  for (let i = password.length; i < len; i++) {
    password += generateX();
  }

  return password;
}

function generateX() {
  const sets = [];
  if (upperEl.checked) sets.push(upperLetters);
  if (lowerEl.checked) sets.push(lowerLetters);
  if (numberEl.checked) sets.push(numbers);
  if (symbolEl.checked) sets.push(symbols);

  if (sets.length === 0) return "";

  return getRandomChar(sets[Math.floor(Math.random() * sets.length)]);
}

function updateGeneratedValues() {
  const username = generateUsername();
  const password = generatePassword();

  usernameEl.innerText = `Username: ${username}`;
  pwEl.innerText = `Password: ${password}`;

  // Salva os valores para cópia
  copyEl.dataset.username = username;
  copyEl.dataset.password = password;
}

generateEl.addEventListener("click", updateGeneratedValues);

copyEl.addEventListener("click", () => {
  const username = copyEl.dataset.username;
  const password = copyEl.dataset.password;

  const formattedText = `Nome: ${username}\nSenha: ${password}`;

  const textarea = document.createElement("textarea");
  textarea.value = formattedText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  alert("Nome e Senha copiados para a área de transferência!");
});