const container = document.querySelector('#container');
const display = container.querySelector('#display');
const keypads = container.querySelector('#keypads');

const screen = display.querySelector('#screen');
const input = screen.querySelector('#input');
const output = screen.querySelector('#output');

const controls = keypads.querySelectorAll('.btn-controls');
const digits = keypads.querySelectorAll('.btn-digits');
const operators = keypads.querySelectorAll('.btn-operators');
const alters = keypads.querySelectorAll('.btn-alters');

let numberOne;
let numberTwo;
let operator;

digits.forEach(key => {
  key.addEventListener('click', (e) => {
    input.textContent += e.target.value;
  })
});


function addition(num1, num2) {
  numberOne = Number(num1);
  numberTwo = Number(num2);
  return numberOne + numberTwo;
}

function subtraction(num1, num2) {
  numberOne = Number(num1);
  numberTwo = Number(num2);
  return numberOne - numberTwo;
}

function multiplication(num1, num2) {
  numberOne = Number(num1);
  numberTwo = Number(num2);
  return numberOne * numberTwo;
}

function division(num1, num2) {
  numberOne = Number(num1);
  numberTwo = Number(num2);
  return numberOne / numberTwo;
}

function operate(operator, num1, num2) {
  let operation = String(operator);
  switch (operation) {
    case 'add':
      let sum = addition(num1, num2);
      console.log(sum);
      break;

    default:
      break;
  }
}