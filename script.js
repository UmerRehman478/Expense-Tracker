let transactions = [];

function updateBalance() {
  const balanceEl = document.getElementById('balance');
  const incomeEl = document.getElementById('income');
  const expenseEl = document.getElementById('expense');

  const amounts = transactions.map((t) => t.amount);
  const totalBalance = amounts.reduce((acc, curr) => acc + curr, 0);
  const income = amounts.filter((amt) => amt > 0).reduce((acc, amt) => acc + amt, 0);
  const expense = amounts.filter((amt) => amt < 0).reduce((acc, amt) => acc + amt, 0);

  balanceEl.textContent = `$${totalBalance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expenseEl.textContent = `$${Math.abs(expense).toFixed(2)}`;
}

function addTransaction(e) {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = +document.getElementById('amount').value;

  if (!description || !amount) return;

  const transaction = { id: Date.now(), description, amount };
  transactions.push(transaction);

  renderTransactions();
  updateBalance();

  document.getElementById('transactionForm').reset();
}

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  renderTransactions();
  updateBalance();
}

function renderTransactions() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  transactions.forEach((transaction) => {
    const li = document.createElement('li');
    li.classList.add(transaction.amount > 0 ? 'positive' : 'negative');
    li.innerHTML = `
      ${transaction.description} <span>${transaction.amount > 0 ? '+' : ''}$${transaction.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${transaction.id})">x</button>
    `;
    transactionList.appendChild(li);
  });
}

document.getElementById('transactionForm').addEventListener('submit', addTransaction);
updateBalance();
