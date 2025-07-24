const inputGroup = document.querySelector(".input-group");
const valueHolder = document.getElementById("value-holder");

let firstNumber = [];
let operation;
let secondNumber = [];

let whichNumber = 0;

function add(a, b) {
  console.log(a, b, a + b);
  return a + b;
}
function subtract(a, b) {
  console.log(a, b, a - b);
  return a - b;
}
function multiply(a, b) {
  console.log(a, b, a * b);
  return a * b;
}
function divide(a, b) {
  console.log(a, b, a / b);
  if (a === 0 && b === 0) return 0;
  return a / b === Infinity ? 0 : a / b;
}

function operate(operator, nr1, nr2) {
  console.log(operation);
  switch (operator) {
    case "+":
      return add(nr1, nr2);
      break;
    case "-":
      return subtract(nr1, nr2);
      break;
    case "*":
      return multiply(nr1, nr2);
      break;
    case "/":
      return divide(nr1, nr2);
      break;
  }
}

function otherOperations(value) {
  switch (value) {
    case "AC":
      firstNumber = [];
      operation = undefined;
      secondNumber = [];
      valueHolder.textContent = 0;
      whichNumber = 0;
      break;
    case "+/-":
      if (whichNumber == 0) {
        firstNumber =
          firstNumber === Number(firstNumber)
            ? firstNumber
            : Number(firstNumber.join(""));
        firstNumber /= -1;
        valueHolder.textContent = firstNumber;
        console.log(firstNumber);
        firstNumber = firstNumber
          .toString()
          .split("")
          .map((char) =>
            char === "-" || char === "." || char === "e" ? char : Number(char)
          );
      } else {
        secondNumber === Number(secondNumber)
          ? secondNumber
          : Number(secondNumber.join(""));
        secondNumber /= -1;
        valueHolder.textContent = secondNumber;
        console.log(secondNumber);
        secondNumber = secondNumber
          .toString()
          .split("")
          .map((char) =>
            char === "-" || char === "." || char === "e" ? char : Number(char)
          );
      }
      break;
    case "%":
      if (whichNumber == 0) {
        firstNumber =
          firstNumber === Number(firstNumber)
            ? firstNumber
            : Number(firstNumber.join(""));
        firstNumber /= 100;
        firstNumber = roundTo9Digits(firstNumber);
        valueHolder.textContent = firstNumber;
        console.log(firstNumber);
        firstNumber = firstNumber
          .toString()
          .split("")
          .map((char) =>
            char === "-" || char === "." || char === "e" ? char : Number(char)
          );
      } else {
        secondNumber === Number(secondNumber)
          ? secondNumber
          : Number(secondNumber.join(""));
        secondNumber /= 100;
        secondNumber = roundTo9Digits(secondNumber);
        valueHolder.textContent = secondNumber;
        console.log(secondNumber);
        secondNumber = secondNumber
          .toString()
          .split("")
          .map((char) =>
            char === "-" || char === "." || char === "e" ? char : Number(char)
          );
      }
      break;
    case "=":
      if (whichNumber == 0) return;
      let n1 =
        firstNumber === Number(firstNumber)
          ? firstNumber
          : Number(firstNumber.join(""));
      let n2 =
        secondNumber === Number(secondNumber)
          ? secondNumber
          : Number(secondNumber.join(""));
      let result = roundTo9Digits(operate(operation, n1, n2));
      firstNumber = result
        .toString()
        .split("")
        .map((char) =>
          char === "-" || char === "." || char === "e" ? char : Number(char)
        );
      secondNumber = [];
      valueHolder.textContent = result;
      operation = "=";
      whichNumber -= 1;
      break;
    case ".":
      if (whichNumber == 0) {
        if (firstNumber.includes(".")) return;
        console.log(firstNumber);
        firstNumber.push(".");
        console.log(firstNumber);
        firstNumber = firstNumber.map((char) =>
          char === "-" || char === "." || char === "e" ? char : Number(char)
        );

        valueHolder.textContent = firstNumber.join("");
        console.log(firstNumber);
      } else {
        if (secondNumber.includes(".")) return;
        console.log(secondNumber);
        secondNumber.push(".");
        console.log(secondNumber);
        secondNumber = secondNumber.map((char) =>
          char === "-" || char === "." || char === "e" ? char : Number(char)
        );
        valueHolder.textContent = secondNumber.join("");
        console.log(secondNumber);
      }
      break;
  }
}

inputGroup.querySelectorAll("button").forEach((el) => {
  el.addEventListener("click", (e) => {
    let value = e.target.textContent;
    if (["AC", "+/-", "%", "=", "."].includes(value)) {
      otherOperations(value);
      return;
    }

    if (whichNumber == 0 && value == Number(value)) {
      if (firstNumber.length == 8) return;
      if (operation === "=") {
        operation = undefined;
        firstNumber = [];
      }
      firstNumber.push(value);
      valueHolder.textContent = firstNumber.join("");
      console.log(firstNumber);
    } else if (value != Number(value) && whichNumber == 0) {
      operation = value;
      whichNumber += 1;
      console.log(operation);
    } else if (whichNumber == 1 && value == Number(value)) {
      if (secondNumber.length == 8) return;
      secondNumber.push(value);
      valueHolder.textContent = secondNumber.join("");
      console.log(secondNumber);
    } else if (value != Number(value) && whichNumber == 1) {
      let n1 =
        firstNumber === Number(firstNumber)
          ? firstNumber
          : Number(firstNumber.join(""));
      let n2 =
        secondNumber === Number(secondNumber)
          ? secondNumber
          : Number(secondNumber.join(""));
      let result = roundTo9Digits(operate(operation, n1, n2));
      firstNumber = result
        .toString()
        .split("")
        .map((char) =>
          char === "-" || char === "." || char === "e" ? char : Number(char)
        );
      secondNumber = [];
      valueHolder.textContent = result;
      operation = value;
      console.log(firstNumber);
      console.log(secondNumber);
      console.log(operation);
    }
  });
});

function roundTo9Digits(num) {
  let str = num.toPrecision(9); // limit to 9 significant digits
  let result = parseFloat(str); // remove unnecessary trailing zeros
  return result;
}
