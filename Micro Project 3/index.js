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
    let stack = [];
    let currentOperator = null;
    
    for (let token of tokens) {
        if (typeof token === 'number') {
            if (currentOperator) {
                let operand1 = stack.pop();
                let operand2 = token;
                let result;
                
                switch (currentOperator) {
                    case '+':
                        result = operand1 + operand2;
                        break;
                    case '-':
                        result = operand1 - operand2;
                        break;
                    case '*':
                        result = operand1 * operand2;
                        break;
                    case '/':
                        result = operand1 / operand2;
                        break;
                }
                stack.push(result);
                currentOperator = null;
            } else {
                stack.push(token);
            }
        } else {
            currentOperator = token;
        }
    }
    
    return stack[0];
}
