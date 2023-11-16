let displayValue = "";

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = displayValue;
}

function calculateResult() {
    try {
        displayValue = customParser(displayValue);
        document.getElementById("display").value = displayValue;
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

function customParser(expression) {
    
    const tokens = expression.match(/(\d+|\+|\-|\*|\/|\.)/g) || [];

    if (!isValidExpression(tokens)) {
        throw new Error("Invalid expression");
    }

    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);

        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                if (operand === 0) {
                    throw new Error("Division by zero");
                }
                result /= operand;
                break;
            default:
                throw new Error("Invalid operator");
        }
    }

    return result;
}

function isValidExpression(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (i % 2 === 0 && !/^\d+$/.test(tokens[i])) {
            return false;
        } else if (i % 2 === 1 && !/^[\+\-\*\/]$/.test(tokens[i])) {
            return false;
        }
    }

    for (let i = 1; i < tokens.length; i += 2) {
        if (/^[\+\-\*\/]$/.test(tokens[i]) && /^[\+\-\*\/]$/.test(tokens[i - 1])) {
            return false;
        }
    }

    return true;
}
