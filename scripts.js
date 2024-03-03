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
  if (value === ".") {
    //find the index of the operator in the expression.
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    //find the index of the decimal in the expression.
    const lastDecimalIndex = expression.lastIndexOf(".");
    //find the index of the last number in the expression.
    const lastNumberIndex = Math.max(
      expression.lastIndexOf("+"),
      expression.lastIndexOf("-"),
      expression.lastIndexOf("/"),
      expression.lastIndexOf("*")
    );
    //check if this is the first decimal in the current expression or this is empty
    if (
      (lastDecimalIndex < lastOperatorIndex ||
        lastDecimalIndex < lastNumberIndex ||
        lastDecimalIndex === -1) &&
      (expression === "" ||
        expression.slice(lastNumberIndex + 1).indexOf("-") === -1)
    ) {
      expression += value;
    }
  } else {
    expression += value;
  }
}

function updateDisplay(expression, result) {
  // Truncate expression and result if they exceed 21 characters
  const truncatedExpression =
    expression.length > 21 ? expression.slice(0, 21) : expression;
  const truncatedResult = result.length > 21 ? result.slice(0, 21) : result;

  expressionDiv.textContent = truncatedExpression;
  resultDiv.textContent = truncatedResult;
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
  result = evaluateExpression();
  expression = "";
}

function evaluateExpression() {
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
    result = evaluateExpression();
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

function decimal(value) {
  if (!expression.endsWith(".") && !isNaN(expression.slice(-1))) {
    addValue(value);
  }
}

// Prevent tap highlighting
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('touchstart', function(event) {
      // Prevent default tap highlighting
      this.style.webkitTapHighlightColor = 'transparent';
  });
});
