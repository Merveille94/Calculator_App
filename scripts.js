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
      case 'addition':
      case 'substraction':
      case 'multiplication':
      case 'division':
        if (expression === '' && result !== '' ) {
            startFromResult(value)
        } else if (expression !== '' && !isLastCharOperator()){
            addValue(value);
        }
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
