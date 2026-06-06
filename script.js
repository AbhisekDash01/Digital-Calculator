let expression = "";

function updateDisplay() {
    document.getElementById("display").innerText = expression || "0";
}

function press(value) {
    expression += value;
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function calculate() {
    try {
        let tokens = tokenize(expression);
        let step1 = solveMulDiv(tokens);
        let result = solveAddSub(step1);

        expression = result.toString();
        updateDisplay();
    } catch {
        expression = "";
        document.getElementById("display").innerText = "Error";
    }
}

/* ---------- YOUR LOGIC ---------- */

function tokenize(expression) {
    let tokens = [];
    let currentNumber = "";

    for (let char of expression) {
        if (!isNaN(char) || char === ".") {
            currentNumber += char;
        } else {
            tokens.push(Number(currentNumber));
            tokens.push(char);
            currentNumber = "";
        }
    }

    tokens.push(Number(currentNumber));
    return tokens;
}

function solveMulDiv(tokens) {
    let result = [];

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];

        if (token === "*" || token === "/") {
            let prev = result.pop();
            let next = tokens[i + 1];

            let value = token === "*" ? prev * next : prev / next;

            result.push(value);
            i++;
        } else {
            result.push(token);
        }
    }

    return result;
}

function solveAddSub(tokens) {
    let result = tokens[0];

    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let next = tokens[i + 1];

        if (operator === "+") result += next;
        else result -= next;
    }

    return result;
}