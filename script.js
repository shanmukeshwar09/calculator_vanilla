const CURRENT_DIV = document.querySelector(".current");
const PREVIOUS_DIV = document.querySelector(".previous");
let running_OP = "";
let shouldRestart = false;

const initNumbers = () => {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
      if (shouldRestart) {
        PREVIOUS_DIV.innerHTML = "";
        shouldRestart = false;
      }
      if (event.target.innerHTML !== ".")
        CURRENT_DIV.innerHTML += event.target.innerHTML;
      else if (!CURRENT_DIV.innerHTML.includes("."))
        CURRENT_DIV.innerHTML += event.target.innerHTML;
    });
  });
};
const initExtras = () => {
  const extras = document.querySelectorAll(".extras");
  extras.forEach((extra) => {
    extra.addEventListener("click", (event) => {
      switch (event.target.id) {
        case "clear":
          CURRENT_DIV.innerHTML = "";
          PREVIOUS_DIV.innerHTML = "";
          running_OP = "";
          break;
        case "delete":
          CURRENT_DIV.innerHTML = CURRENT_DIV.innerHTML.slice(
            0,
            CURRENT_DIV.innerHTML.length - 1
          );
          break;

        default:
          break;
      }
    });
  });
};
const initOperations = () => {
  const operations = document.querySelectorAll(".operation");
  operations.forEach((operation) => {
    operation.addEventListener("click", (event) => {
      if (PREVIOUS_DIV.innerHTML === "") {
        if (CURRENT_DIV.innerHTML !== "") {
          running_OP = event.target.innerHTML;
          PREVIOUS_DIV.innerHTML = CURRENT_DIV.innerHTML + running_OP;
        }
      } else if (event.target.innerHTML === "=") {
        handleOP();
        shouldRestart = true;
      } else {
        handleOP();
        running_OP = event.target.innerHTML;
        PREVIOUS_DIV.innerHTML += running_OP;
      }

      CURRENT_DIV.innerHTML = "";
    });
  });
};

function handleOP() {
  let num1 = parseFloat(
    PREVIOUS_DIV.innerHTML.slice(0, PREVIOUS_DIV.innerHTML.length - 1)
  );
  let num2 = parseFloat(CURRENT_DIV.innerHTML);
  switch (running_OP) {
    case "+":
      PREVIOUS_DIV.innerHTML = `${num1 + num2}`;
      break;

    case "-":
      PREVIOUS_DIV.innerHTML = `${num1 - num2}`;
      break;

    case "*":
      PREVIOUS_DIV.innerHTML = num1 * num2;
      break;

    case "/":
      PREVIOUS_DIV.innerHTML = num1 / num2;
      break;

    default:
      break;
  }
}

initOperations();
initExtras();
initNumbers();
