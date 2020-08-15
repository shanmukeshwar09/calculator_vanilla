let current = '';
let previous = '';
let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let previous_div = document.querySelector('.previous')
let current_div = document.querySelector('.current')
let extras = document.querySelectorAll('.extras')
let point = document.getElementById('point')
let equals = document.getElementById('equals')


equals.addEventListener('click', (id) => {

    current_div.innerHTML = calculate(previous);
    previous_div.innerHTML = '';
    previous = '';

})

point.addEventListener('click', (id) => {
    if (!current_div.innerHTML.includes('.')) {
        if (current_div.innerHTML.length == 0)
            current_div.innerHTML += '0.';
    }
})


extras.forEach(element => {
    element.addEventListener('click', handleExtras, false);
})


numbers.forEach(element => {
    element.addEventListener('click', handleNumbers, false);
});

operations.forEach(element => {
    element.addEventListener('click', handleOperations, false);
})

function handleExtras(extrasId) {

    if (current_div.innerHTML.length > 0)

        switch (extrasId.target.innerHTML) {
        case 'AC':
            current_div.innerHTML = '';
            previous_div.innerHTML = '';
            current = '';
            previous = '';
            break;

        case 'DEL':

            current_div.innerHTML = current_div.innerHTML.slice(0, current.length - 1);
            break;

        default:

            break;
    }
}

function handleOperations(symbol) {

    if (current_div.innerHTML.replace('-', '').length > 0) {

        if (previous == '') {
            previous = symbol.target.innerHTML;
            previous_div.innerHTML = current_div.innerHTML + previous;
            current_div.innerHTML = '';

        } else {
            current = symbol.target.innerHTML;
            previous_div.innerHTML = calculate(previous);
            previous = current;
            current_div.innerHTML = '';
        }
    } else {
        if (symbol.target.innerHTML == '-') {
            current_div.innerHTML = '-'
        }
    }
}

function calculate(operationData) {
    let num1 = previous_div.innerHTML.slice(0, previous_div.innerHTML.length - 1);
    switch (operationData) {
        case '+':
            return parseFloat(num1) + parseFloat(current_div.innerHTML) + current;

        case '-':
            return parseFloat(num1) - parseFloat(current_div.innerHTML) + current;

        case '/':
            return parseFloat(num1) / parseFloat(current_div.innerHTML) + current;

        case '*':
            return parseFloat(num1) * parseFloat(current_div.innerHTML) + current;

        default:
            break;
    }
}

function handleNumbers(number) {
    current_div.innerHTML += number.target.innerHTML;
}