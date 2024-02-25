const buttons = document.getElementsByClassName("calcButton")
const result = document.getElementById("resultWindow")
const clr = document.getElementById("clrButton")
let decimalPresent = false
let resultShown = false
let num1 = 0
let num2 = 0
let op = ""

const resultOutput = () => {
  if (op == "") return
  num2 = parseFloat(result.innerText)
  let ans = operate(op, num1, num2)
  if (ans == "DIVZEROERROR") {
    handleClear()
    result.innerText = "DIVZEROERROR"
    resultShown = true
    return
  }
  let answer = parseFloat(ans.toFixed(10))
  result.innerText = answer
  resultShown = true
  op = ""
}

const handleAction = (event) => {
  if (event.target.classList.contains("opButton")) {
    if (op != "") {
      resultOutput()
    }
    num1 = parseFloat(result.innerText)
    resultShown = true
    op = event.target.innerText
    decimalPresent = false
    return
  }

  if (event.target.innerText == "=") {
    resultOutput()
    return
  }

  if (resultShown) {
    result.innerText = ""
    resultShown = false
  }

  if (event.target.innerText == ".") {
    if (decimalPresent) return
    else decimalPresent = true
  }
  result.append(event.target.innerText)
}

const handleClear = (event) => {
  result.innerText = ""
  decimalPresent = false
  resultShown = false
  num1 = 0
  num2 = 0
  op = ""
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2
    case "-":
      return num1 - num2
    case "X":
      return num1 * num2
    case "/":
      if (num2 == 0) return "DIVZEROERROR"
      else return num1 / num2
  }
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleAction)
}
clr.addEventListener("click", handleClear)
