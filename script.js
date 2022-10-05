const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expense = document.getElementById("expense")
const history = document.getElementById("history")
const operation = document.getElementById("operation")
const amount = document.getElementById("amount")
const add = document.getElementById("add")

let arrOfOperations = []

// Deal with localStorage
if (localStorage.getItem("operations")) {
    arrOfOperations = JSON.parse(localStorage.getItem("operations"))
    addOperation()
    updateBalance()
}

// Event Listeners
add.addEventListener("click", () => {

    // add operation
    addOperation()
    updateBalance()
})

// Add operation to history
function addOperation() {
    history.innerHTML = ""
    if (operation.value !== "" && amount.value != false) {

        // add to array of operations
        const id = Date.now()
        arrOfOperations.push({
            id: id,
            operationName: operation.value,
            amount: +amount.value
        })

        // Save to localStorage
        saveToLocalStorage()

    }
    // add operations to web page
    arrOfOperations.forEach((operation) => {
        const div = document.createElement("div")
        operation.amount < 0 ? div.classList.add("expense-operation") : div.classList.add("income-operation")
        div.innerHTML = `<span class="delete" onclick="removeOperation(${operation.id})">x</span>
        <span>${operation.operationName}</span> 
        <span>${(operation.amount <= 0 ? "" : "+") + operation.amount}</span>`
        history.appendChild(div)
        })
        operation.value = ""
        amount.value = ""
}

// Update balance
function updateBalance() {
    // update balance
    balance.innerText = arrOfOperations.reduce((balance, operation) => balance += operation.amount, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

    // Update income
    income.innerHTML = ""
    income.innerText = arrOfOperations.reduce((income, operation) => {
        if (operation.amount >= 0) income += operation.amount
        return income
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

    // Update expense
    expense.innerHTML = ""
    expense.innerText = arrOfOperations.reduce((expense, operation) => {
        if (operation.amount < 0) expense += -operation.amount
        return expense
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

// Remove Operation
function removeOperation(id) {
    arrOfOperations = arrOfOperations.filter((operation) => operation.id !== id)
    saveToLocalStorage()
    addOperation()
    updateBalance()
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem("operations", JSON.stringify(arrOfOperations))
}