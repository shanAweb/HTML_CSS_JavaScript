document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  const display = document.querySelector(".textBox input");
  let currentInput = "";
  let operator = "";
  let firstValue = "";
  let secondValue = "";
  let result = "";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (button.classList.contains("dark")) {
        if (operator === "") {
          firstValue += value;
          currentInput = firstValue;
        } else {
          secondValue += value;
          currentInput = firstValue + operator + secondValue;
        }
      } else if (button.classList.contains("orange")) {
        if (value === "=") {
          calculate();
        } else {
          if (firstValue !== "" && secondValue !== "") {
            calculate();
            firstValue = result.toString();
            secondValue = "";
          }
          operator = value;
          currentInput = firstValue + operator;
        }
      } else if (button.classList.contains("grey")) {
        if (value === "C") {
          clearAll();
        } else if (value === "+/-") {
          toggleSign();
        } else if (value === "%") {
          calculatePercentage();
        }
      }

      updateDisplay();
    });
  });

  function updateDisplay() {
    display.value = currentInput;
  }

  function calculate() {
    if (firstValue !== "" && secondValue !== "" && operator !== "") {
      const num1 = parseFloat(firstValue);
      const num2 = parseFloat(secondValue);

      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "x":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
      }

      currentInput = result.toString();
      firstValue = result.toString();
      secondValue = "";
      operator = "";
    }
  }

  function clearAll() {
    currentInput = "";
    operator = "";
    firstValue = "";
    secondValue = "";
    result = "";
    display.value = "";
  }

  function toggleSign() {
    if (operator === "") {
      firstValue = (parseFloat(firstValue) * -1).toString();
      currentInput = firstValue;
    } else {
      secondValue = (parseFloat(secondValue) * -1).toString();
      currentInput = firstValue + operator + secondValue;
    }
  }

  function calculatePercentage() {
    if (operator === "") {
      firstValue = (parseFloat(firstValue) / 100).toString();
      currentInput = firstValue;
    } else {
      secondValue = (parseFloat(secondValue) / 100).toString();
      currentInput = firstValue + operator + secondValue;
    }
  }
});
