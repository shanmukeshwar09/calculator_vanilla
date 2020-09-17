const CURRENT_DIV = document.querySelector(".current");
const PREVIOUS_DIV = document.querySelector(".previous");
let running_OP = "";
let shouldRestart = false;

const init = () => {
  document.addEventListener("keydown", handleKeyPad);

  document
    .querySelectorAll(".number")
    .forEach((number) =>
      number.addEventListener("click", (event) =>
        handleCurrentDiv(event.target.innerHTML)
      )
    );

  document
    .querySelectorAll(".extras")
    .forEach((extra) =>
      extra.addEventListener("click", (event) => handleExtras(event.target.id))
    );

  document.querySelectorAll(".operation").forEach((operation) => {
    operation.addEventListener("click", (event) =>
      handleOperations(event.target.innerHTML)
    );
  });
};

const handleKeyPad = ({ key }) => {
  if (Number(key)) handleCurrentDiv(Number(key));
  else if (key.match(/Backspace|Delete/)) handleExtras(key);
  else if (key.match(/[+\-*/]/)) handleOperations(key);
  else if (key === "Enter") handleOperations("=");
};

const handleExtras = (extra) => {
  switch (extra) {
    case "clear":
    case "Delete":
      CURRENT_DIV.innerHTML = "";
      PREVIOUS_DIV.innerHTML = "";
      running_OP = "";
      break;
    case "delete":
    case "Backspace":
      const current = CURRENT_DIV.innerHTML;
      CURRENT_DIV.innerHTML = current.slice(0, current.length - 1);
      break;
    default:
      break;
  }
};

const handleOperations = (value) => {
  if (value == "=") {
    if (CURRENT_DIV.innerHTML !== "" && PREVIOUS_DIV.innerHTML !== "") {
      runOeration();
      shouldRestart = true;
      CURRENT_DIV.innerHTML = "";
    }
  } else if (value == "!") {
    console.log("!");
    if (value.innerHTML !== "") {
      let temp = parseInt(CURRENT_DIV.innerHTML);
      let result = 1;
      for (let i = temp; i > 0; i--) result *= i;
      PREVIOUS_DIV.innerHTML = result;
      shouldRestart = true;
      CURRENT_DIV.innerHTML = "";
    }
  } else if (CURRENT_DIV.innerHTML !== "" || PREVIOUS_DIV.innerHTML !== "") {
    if (shouldRestart) {
      running_OP = value;
      PREVIOUS_DIV.innerHTML += running_OP;
      shouldRestart = false;
    } else if (PREVIOUS_DIV.innerHTML === "" && CURRENT_DIV.innerHTML !== "") {
      running_OP = value;
      PREVIOUS_DIV.innerHTML = CURRENT_DIV.innerHTML + running_OP;
    } else {
      runOeration();
      running_OP = value;
      PREVIOUS_DIV.innerHTML += running_OP;
    }
    CURRENT_DIV.innerHTML = "";
  }
};

const handleCurrentDiv = (number) => {
  if (shouldRestart) {
    CURRENT_DIV.innerHTML = PREVIOUS_DIV.innerHTML;
    PREVIOUS_DIV.innerHTML = "";
    shouldRestart = false;
  }
  if (number !== ".") CURRENT_DIV.innerHTML += number;
  else if (!CURRENT_DIV.innerHTML.includes("."))
    CURRENT_DIV.innerHTML += number;
};

const runOeration = () => {
  const num1 = parseFloat(
    PREVIOUS_DIV.innerHTML.slice(0, PREVIOUS_DIV.innerHTML.length - 1)
  );

  const num2 = parseFloat(CURRENT_DIV.innerHTML);
  switch (running_OP) {
    case "+":
      PREVIOUS_DIV.innerHTML = num1 + num2;
      break;
    case "-":
      PREVIOUS_DIV.innerHTML = num1 - num2;
      break;
    case "*":
      PREVIOUS_DIV.innerHTML = num1 * num2;
      break;
    case "/":
      PREVIOUS_DIV.innerHTML = num1 / num2;
      break;
    case "%":
      PREVIOUS_DIV.innerHTML = (num1 / 100) * num2;
      break;
    case "^":
      PREVIOUS_DIV.innerHTML = Math.pow(num1, num2);
      break;

    default:
      break;
  }
};

init();
