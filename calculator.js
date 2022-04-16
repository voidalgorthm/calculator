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

const clear = keypads.querySelector('#clrall');
const clearEntry = keypads.querySelector('#clrentry');
const backspace = keypads.querySelector('#back');

const equals = keypads.querySelector('#equals');

let firstNumber = '';
let secondNumber = '';
let operator = null;
let resetScreen = false;
let stat;

clear.addEventListener('click', clearAll);

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operator = null;
  resetScreen = false;
  stat = '';
  input.textContent = '';
  output.textContent = '';
}

clearEntry.addEventListener('click', () => {
  if (firstNumber && secondNumber && operator === null) {
    clearAll();
  } else if ((!firstNumber || firstNumber.length === '0') || (firstNumber && operator === null) || (firstNumber && operator !== null)) {
    input.textContent = '';
  }
});

backspace.addEventListener('click', () => {
  lastIndex = input.textContent.length - 1;
  if (lastIndex === -1) return
  input.textContent = input.textContent.slice(0, lastIndex);
})

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

equals.addEventListener('click', evaluateNumbers);

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