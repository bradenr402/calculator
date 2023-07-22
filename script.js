function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let num1,
    op,
    num2;

function operate([num1, op, num2]) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const allButtons = document.querySelector('.all-buttons');
const display = document.querySelector('.display');

allButtons.addEventListener('click', (e) => {
    let keyValue = e.target.textContent;
    display.textContent += keyValue;
});
