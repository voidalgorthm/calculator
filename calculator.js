const calc = document.querySelector('#calc');
const display = calc.querySelector('#display');
const keypads = calc.querySelector('#keypads');

const screen = display.querySelector('#screen');
const input = screen.querySelector('#input');
const output = screen.querySelector('#output');

const controls = keypads.querySelectorAll('.btn-controls');
const digits = keypads.querySelectorAll('.btn-digits');
const operators = keypads.querySelectorAll('.btn-operators');
const alters = keypads.querySelectorAll('.btn-alters');

const equals = keypads.querySelector('#equals');

let firstNumber = '';
let secondNumber = '';
let operator = null;
let resetScreen = false;
let stat;

digits.forEach(key => {
  key.addEventListener('click', pressedDigits);
});

function pressedDigits(event) {
  if (resetScreen || input.textContent === '0') clearScreen();
  input.textContent += event.target.value;
}

function clearScreen() {
  input.textContent = '';
  resetScreen = false;
}

operators.forEach(key => {
  key.addEventListener('click', selectOperation);
});

function selectOperation(event) {
  if (operator !== null) evaluateNumbers();
  operator = event.target.value;
  firstNumber = input.textContent;
  stat = `${firstNumber} ${operator} `;
  output.textContent = stat;
  resetScreen = true;
}

function evaluateNumbers() {
  if (operator === null || resetScreen) return;
  secondNumber = input.textContent;
  output.textContent = stat;
  const tempAnswer = operate(operator, firstNumber, secondNumber);
  stat = `${firstNumber} ${operator} ${secondNumber} = `;
  input.textContent = tempAnswer;
  output.textContent = stat;
  operator = null;
}

equals.addEventListener('click', evaluateNumbers);

function operate(operator, num1, num2) {
  const numberOne = Number(num1);
  const numberTwo = Number(num2);

  switch (operator) {
    case '+':
      let sum = addition(numberOne, numberTwo);
      return sum;
    case '-':
      let diff = subtraction(numberOne, numberTwo);
      return diff;
    case '*':
      let prod = multiplication(numberOne, numberTwo);
      return prod;
    case '/':
      let quot = division(numberOne, numberTwo);
      return quot;

    default:
      break;
  }
}

function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}