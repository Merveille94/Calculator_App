//Access DOM Element of the calculator
const inputBox = document.getElementById("input");
const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

//define the expression and result variable
let expression = "";
let result = "";

//define an event handler for the clicks
function buttonClick(event) {
  //Get values from clicked buttons
  const target = event.target;
  const action = target.dataset.action;
  const value = target.dataset.value;
  // console.log(target, action, value);

  //Switch case to control the calculator
  switch (action) {
    case "number":
      addValue(value);
      break;
    case "clear":
      clear();
      break;
    case "backspace":
      backspace();
      break;
    //Add result as the starting point is the expression is empty
    case "addition":
    case "substraction":
    case "multiplication":
    case "division":
      if (expression === "" && result !== "") {
        startFromResult(value);
      } else if (expression !== "" && !isLastCharOperator()) {
        addValue(value);
      }
      break;
    case "submit":
      submit();
      break;
    case "negate":
      negate();
      break;
    case "mod":
      percentage();
      break;
    case "decimal":
      decimal(value);
      break;
  }

  //update the display
  updateDisplay(expression, result);
}

inputBox.addEventListener("click", buttonClick);

function addValue(value) {
  //Add value to the expression
  expression += value;
  //   console.log(expression);
}

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression;
  resultDiv.textContent = result;
}

function clear() {
  expression = "";
  result = " ";
}

function backspace() {
  expression = expression.slice(0, -1);
}

function isLastCharOperator() {
  return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
  expression += result + value;
}

function submit() {
  result = evluateExpression();
  expression = "";
}

function evluateExpression() {
  const evalResult = eval(expression);
  //check if evalResult isNaN or isfinite. If it is return a space character ''
  return isNaN(evalResult) || !isFinite(evalResult)
    ? ""
    : evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
  //negate the result if expression empty and result is present
  if (expression === "" && result !== "") {
    result = -result;
    //toggle the sign of the expression if it is not negeative and not empty
  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;
    //remove the negative sign from the expression if it is already negative
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

function percentage() {
  //evaluate the expression else it will take the percentage of only the first number
  if (expression !== "") {
    result = evluateExpression();
    expression = "";
    if (!isNaN(result) && isFinite(result)) {
      result /= 100;
    } else {
      result = "";
    }
  } else if (result !== "") {
    //if expression id empty but the result exist divide by 100.
    result = parseFloat(result) / 100;
  }
}

function decimal(){

}
