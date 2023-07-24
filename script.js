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
    if (b == 0) {
        return 'ERROR';
    } else {
        return a / b;
    }
}

function operate(num1, op, num2) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

let num1,
    op,
    num2;

let equalPressed = 0,
    operatorPressed = 0,
    decimalPressed = 0;

let buttonInput = document.querySelectorAll('.input-button');
let operator = document.querySelectorAll('.operator');

const miniDisplay = document.getElementById('mini-display');
const display = document.getElementById('display');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');
const delButton = document.getElementById('erase');

window.onload = () => {
    display.value = '';
};

buttonInput.forEach((buttonClass) => {
    buttonClass.addEventListener('click', () => {
        if (equalPressed === 1) {
            display.value = '';
            equalPressed = 0;
        }

        if (display.value === op) {
            display.value = '';
            miniDisplay.value = `${num1} ${op}`;
        }

        if (decimalPressed === 0 || buttonClass.value !== '.') {
            display.value += buttonClass.value;
        }

        if (buttonClass.value === '.') {
            decimalPressed = 1;
        }
    });
});

operator.forEach((operatorClass) => {
    operatorClass.addEventListener('click', () => {
        if (operatorPressed === 1) {
            if (!isNaN(display.value)) {
                num2 = display.value;
                evaluate();
                num1 = display.value;
            }

        } else {
            num1 = display.value;
            operatorPressed = 1;
            decimalPressed = 0;

        }
        op = operatorClass.value;
        display.value = op;
            miniDisplay.value = num1;
    });
});

equalButton.addEventListener('click', () => {
    num2 = display.value;
    if (!(num1 == undefined) && !(op == undefined) && !(num2 === op)) {
        evaluate();
        equalPressed = 1;
        operatorPressed = 0;
        decimalPressed = 0;
    }
});

function evaluate() {
    let solution = +operate(num1, op, num2);

    if (solution.toString().length >= 13) {
        solution = solution.toFixed(12);
    }

    // Removes trailing zeros from number
    solution = parseFloat(solution);

    display.value = solution;
    miniDisplay.value = `${num1} ${op} ${num2}`;
}

delButton.addEventListener('click', () => {
    if (equalPressed === 1) {
        clear();
    } else {
        display.value = display.value.slice(0, -1);
    }
});

clearButton.addEventListener('click', clear);

function clear() {
    location.reload();
}

document.addEventListener('keydown', (event) => {
    let getOperators = {
        '+': 'add',
        '-': 'subtract',
        'x': 'multiply',
        '/': 'divide',
    }

    if (!isNaN(event.key) && event.key !== ' ') {
        document.getElementById(`digit-${event.key}`).click();
    }

    if (['/', 'x', '+', '-'].includes(event.key)) {
        document.getElementById(getOperators[event.key]).click();
    }

    if (event.key === 'Backspace') {
        document.getElementById('erase').click();
    }

    if (event.key === '=' || event.key === 'Enter') {
        document.getElementById('equal').click();
    }

    if (event.key === 'c' || event.key === 'C') {
        document.getElementById('clear').click();
    }

    if (event.key === '.') {
        document.getElementById('decimal').click();
    }
});
