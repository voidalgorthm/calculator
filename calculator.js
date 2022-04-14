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