let display = document.getElementById("display");
function appendValue(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = "";
}
function calculateResult() {
    let expression = display.value;
    let numbers = [];
    let operators = [];
    let currentNum = "";

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (/[0-9]/.test(char)) {
            currentNum += char;
        } else if (/[+\-*/]/.test(char)) {
            numbers.push(parseFloat(currentNum));
            operators.push(char);
            currentNum = "";
        }
    }
    if (currentNum !== "") {
        numbers.push(parseFloat(currentNum));
    }
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            let result;
            if (operators[i] === '*') {
                result = numbers[i] * numbers[i + 1];
            } else if (operators[i] === '/') {
                result = numbers[i] / numbers[i + 1];
            }
            numbers[i] = result;
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < operators.length; i++) {
        let result;
        if (operators[i] === '+') {
            result = numbers[i] + numbers[i + 1];
        } else if (operators[i] === '-') {
            result = numbers[i] - numbers[i + 1];
        }
        numbers[i] = result;
        numbers.splice(i + 1, 1);
        operators.splice(i, 1);
        i--;
    }
    display.value = numbers[0];
}
