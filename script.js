const warning = document.getElementById("warning")

let memory = []
let result = null

function add(a, b) {return a + b}
function subtract(a, b) {return a - b}
function multiply(a, b) {return a * b}
function divide(a, b) {return a / b}

function operate(a, b, func) {return func(a,b)}

function display(x) {document.getElementById("result").innerHTML = x}

function decimalUpdate(x) {
    if (x.includes(".")) {
        return x
    } else {
        return x += "."
    }
}

function zeroUpdate(x, y) {
    if (x === "0") {
        return y
    } else {
        return x + y
    }
}

function calc(){
    warning.style.visibility = "hidden"
    if (this.id === "clear") {
        memory = []
        result = null
        display("")
    }
    if (memory.length === 0) {
        if (this.id === "backspace") {
            return
        } else if (this.id === "equals") {
            return
        } else if (this.id === "decimal") {
            memory.push("0.")
            display(".")
        } else if (isNaN(parseInt(this.id))) {
            if (result !== null) {
                memory.push(result)
                memory.push(this.id)
            }
        } else {
            memory.push(this.id)
            display(memory[0])
        }
    } else if (memory.length === 1) {
        if (this.id === "backspace") {
            if (memory[0].length === 1) {
                memory = []
                result = null
                display("")
            } else {
                memory[0] = memory[0].slice(0,-1)
                result = memory[0]
                display(result)
            }
        } else if (this.id === "equals") {
            result = parseFloat(memory[0])
            memory = []
            display(result)
        } else if (this.id === "decimal") {
            memory[0] = decimalUpdate(memory[0])
            display(memory[0])
        } else if (isNaN(parseInt(this.id))) {
            memory.push(this.id)
        } else {
            memory[0] = zeroUpdate(memory[0], this.id)
            display(memory[0])
        }
    } else if (memory.length === 2) {
        if (this.id === "backspace") {
            memory = [memory[0]]
        } else if (this.id === "equals") {
            result = parseFloat(memory[0])
            memory = []
            display(result)
        } else if (this.id === "decimal") {
            memory.push("0.")
            display(".")
        } else if (isNaN(parseInt(this.id))) {
            memory[1] = this.id
        } else {
            memory.push(this.id)
            display(memory[2])
        }
    } else if (memory.length === 3) {
        if (this.id ==="backspace") {
            if (memory[2].length === 1) {
                if (memory[2] === "0") {
                    memory = [memory[0]]
                    display(memory[0])
                } else {
                    memory[2] = "0"
                    display(memory[2])
                }
            } else {
                memory[2] = memory[2].slice(0, -1)
                display(memory[2])
            }
        } else if (this.id === "decimal") {
            memory[2] = decimalUpdate(memory[2])
            display(memory[2])
        } else if (isNaN(parseInt(this.id))) {
            let operation
            if (memory[1] === "add") {operation = add}
            if (memory[1] === "subtract") {operation = subtract}
            if (memory[1] === "multiply") {operation = multiply}
            if (memory[1] === "divide") {operation = divide}
            result = operate(
                parseFloat(memory[0]),
                parseFloat(memory[2]),
                operation
            )
            if (result === Infinity) {
                warning.style.visibility = "visible"
            } else {
                display(result)
                if (this.id === "equals") {
                    memory = []
                } else {memory = [result, this.id]}
            }
        } else {
            memory[2] = zeroUpdate(memory[2], this.id)
            display(memory[2])
        }
    }
    document.getElementById('debug').innerHTML = memory
}

function test(e) {
    let k = e.keyCode
    if (k === 96 || k === 48 && e.shiftKey === false) {
        document.getElementById("0").click()
    } else if (k === 97 || k === 49  && e.shiftKey === false) {
        document.getElementById("1").click()
    } else if (k === 98 || k === 50 && e.shiftKey === false) {
        document.getElementById("2").click()
    } else if (k === 99 || k === 51 && e.shiftKey === false) {
        document.getElementById("3").click()
    } else if (k === 100 || k === 52 && e.shiftKey === false) {
        document.getElementById("4").click()
    } else if (k === 101 || k === 53 && e.shiftKey === false) {
        document.getElementById("5").click()
    } else if (k === 102 || k === 54 && e.shiftKey === false) {
        document.getElementById("6").click()
    } else if (k === 103 || k === 55 && e.shiftKey === false) {
        document.getElementById("7").click()
    } else if (k === 104 || k === 56 && e.shiftKey === false) {
        document.getElementById("8").click()
    } else if (k === 105 || k === 57 && e.shiftKey === false) {
        document.getElementById("9").click()
    } else if (k === 107 || k === 187 && e.shiftKey === true) {
        document.getElementById("add").click()
    } else if (k === 109 || k === 189 && e.shiftKey === false) {
        document.getElementById("subtract").click()
    } else if (k === 106 || k === 56 && e.shiftKey === true) {
        document.getElementById("multiply").click()
    } else if (k === 111 || k === 191  && e.shiftKey === false) {
        document.getElementById("divide").click()
    } else if (k === 110 || k === 190  && e.shiftKey === false) {
        document.getElementById("decimal").click()
    } else if (k === 13 || k === 187 && e.shiftKey === false) {
        document.getElementById("equals").click()
    } else if (k === 27) {
        document.getElementById("clear").click()
    } else if (k === 8) {
        document.getElementById("backspace").click()
    }
}

const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.addEventListener('click', calc))
window.addEventListener('keydown', test)
