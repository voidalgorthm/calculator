const calc = document.querySelector('#calc');
const display = calc.querySelector('#display');
const keypads = calc.querySelector('#keypads');
const footer = document.querySelector('footer');

const screen = display.querySelector('#screen');
const input = screen.querySelector('#input');
const output = screen.querySelector('#output');

const buttons = keypads.querySelectorAll('button');
const controls = keypads.querySelectorAll('.btn-controls');
const digits = keypads.querySelectorAll('.btn-digits');
const operators = keypads.querySelectorAll('.btn-operators');
const alters = keypads.querySelectorAll('.btn-alters');

const clear = keypads.querySelector('#clrall');
const clearEntry = keypads.querySelector('#clrentry');
const backspace = keypads.querySelector('#back');

const sign = keypads.querySelector('#sign');
const decimal = keypads.querySelector('#decimal');
const equals = keypads.querySelector('#equals');

let firstNumber = '';
let secondNumber = '';
let operator = null;
let resetScreen = false;
let stat;
let eventType;

sign.addEventListener('click', changeSign);

function changeSign(event) {
  if (Math.sign(input.textContent) === 1) {
    input.textContent = -Math.abs(input.textContent);
  } else if (Math.sign(input.textContent) === -1) {
    input.textContent = Math.abs(input.textContent);
  }
}

clear.addEventListener('click', clearAll);

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operator = null;
  resetScreen = false;
  stat = '';
  input.textContent = '0';
  output.textContent = '';
}

clearEntry.addEventListener('click', clearEntries);

function clearEntries(event) {
  if (firstNumber && secondNumber && operator === null) {
    clearAll();
  } else if ((!firstNumber || firstNumber.length === '0') || (firstNumber && operator === null) || (firstNumber && operator !== null)) {
    input.textContent = '0';
  }
}

backspace.addEventListener('click', backByOne);

function backByOne(event) {
  lastIndex = input.textContent.length - 1;
  if (lastIndex === -1) return;
  input.textContent = input.textContent.slice(0, lastIndex);
}


digits.forEach(key => {
  key.addEventListener('click', pressedDigits);
});

function pressedDigits(event) {
  if (resetScreen || input.textContent === '') clearScreen();

  if (input.textContent === '0') {
    if (getEventType(event) === 'click') {
      input.textContent = event.target.value;
    } else if (getEventType(event) === 'keydown') {
      input.textContent = event.key;
    }
  } else if (input.textContent !== '0' || input.textContent.length > 0) {
    if (getEventType(event) === 'click') {
      input.textContent += event.target.value;
    } else if (getEventType(event) === 'keydown') {
      input.textContent += event.key;
    }
  }
}

function clearScreen() {
  input.textContent = '';
  resetScreen = false;
}

operators.forEach(key => {
  key.addEventListener('click', selectOperation);
});

function selectOperation(event) {
  if (operator === null && input.textContent === '') return;
  if (operator !== null && firstNumber) evaluateNumbers();

  if (getEventType(event) === 'click') {
    operator = event.target.value;
  } else if (getEventType(event) === 'keydown') {
    operator = event.key;
  }
  firstNumber = input.textContent;
  stat = `${firstNumber} ${operator} `;
  output.textContent = stat;
  resetScreen = true;
}

decimal.addEventListener('click', putDecimal);

function putDecimal(event) {
  if (firstNumber && operator !== null && input.textContent === firstNumber) {
    input.textContent = ''; resetScreen = false;
  }
  if (input.textContent === '') input.textContent = '0';
  if (input.textContent.includes('.')) return;
  input.textContent += ".";
}

equals.addEventListener('click', evaluateNumbers);

function evaluateNumbers() {
  if (operator === null || resetScreen) return;
  secondNumber = input.textContent;
  output.textContent = stat;
  const tempAnswer = conversion(operate(operator, firstNumber, secondNumber));
  stat = `${firstNumber} ${operator} ${secondNumber} = `;
  if (tempAnswer === null) {
    clearAll();
  } else {
    input.textContent = tempAnswer;
    output.textContent = stat;
    operator = null;
  }
}

function conversion(number) {
  let num = number % 1 === 0 ? (number) : (Math.round(number * 100) / 100).toFixed(3);
  return num;
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
      if (numberTwo === 0) {
        alert('ERROR! answer is infinity');
        return null;
      }
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

window.addEventListener('keydown', keyboardFunction);

window.addEventListener('keydown', function (event) {
  if (event.key === '/' || event.key === 'Enter') {
    event.preventDefault();
  }
});

window.addEventListener('keyup', function (event) {
  buttons.forEach(button => {
    if (button.classList.contains('active')) button.classList.remove('active');
  })
});

function getEventType(event) {
  return event.type;
}

function keyboardFunction(event) {
  buttons.forEach(button => {
    if (event.key === button.getAttribute('value')) button.classList.add('active');
  });

  if (event.key >= 0 && event.key <= 9) pressedDigits(event);
  if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') selectOperation(event)
  if (event.key === '.') putDecimal();
  if (event.key === '=' || event.key === 'Enter') evaluateNumbers();
  if (event.key === 'Backspace') backByOne();
  if (event.key === 'Escape') clearEntries();
  if (event.key === 'Delete') clearAll();
  if (event.key === ',') changeSign();
}

footer.textContent = `\u00A9 codexeger, ${(new Date().getFullYear())}`;