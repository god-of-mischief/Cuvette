let display = document.getElementById('calc-display');
let expression = '';
let operators = ['+', '-', '*', '/'];

function input(value) {
    if (operators.includes(value) && (expression === '' || operators.includes(expression.slice(-1)))) {
        return;
    }
    expression += value;
    display.innerText = expression;
}

function del() {
    expression = expression.slice(0, -1);
    display.innerText = expression || '0';
}

function reset() {
    expression = '';
    display.innerText = '0';
}

function calculate() {
    try {
        let tokens = parseExpression(expression);
        let result = evaluateTokens(tokens);
        if (Number.isInteger(result)) {
            display.innerText = result.toString();  
        } else {
            display.innerText = result.toFixed(3).replace(/\.?0+$/, ''); 
        }
        expression = result.toString();
    } catch (error) {
        display.innerText = 'Error';
        expression = '';
    }
}

function parseExpression(expr) {
    let tokens = [];
    let currentNumber = '';
    let operators = ['+', '-', '*', '/'];
    
    for (let char of expr) {
        if (operators.includes(char)) {
            if (currentNumber) tokens.push(parseFloat(currentNumber));
            tokens.push(char);
            currentNumber = '';
        } else {
            currentNumber += char;
        }
    }
    if (currentNumber) tokens.push(parseFloat(currentNumber));
    
    return tokens;
}

function evaluateTokens(tokens) {
    let newTokens = [];
    let i = 0;

    while (i < tokens.length) {
        if (tokens[i] === '*') {
            let result = newTokens.pop() * tokens[i + 1];
            newTokens.push(result);
            i += 2;
        } else if (tokens[i] === '/') {
            let result = newTokens.pop() / tokens[i + 1];
            newTokens.push(result);
            i += 2;
        } else {
            newTokens.push(tokens[i]);
            i++;
        }
    }

    let finalResult = newTokens[0];
    i = 1;

    while (i < newTokens.length) {
        if (newTokens[i] === '+') {
            finalResult += newTokens[i + 1];
        } else if (newTokens[i] === '-') {
            finalResult -= newTokens[i + 1];
        }
        i += 2;
    }

    return finalResult;
}
