// Expense Tracker Application
// LocalStorage keys
const EXPENSES_KEY = 'expenses';
const BUDGET_KEY = 'monthlyBudget';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
    updateStatistics();
    updateCategoryBreakdown();
    loadBudget();
    setupEventListeners();
    setMaxDate();
});

// Set up event listeners
function setupEventListeners() {
    // Form submission
    document.getElementById('expenseForm').addEventListener('submit', addExpense);

    // Filter changes
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterDateFrom').addEventListener('change', applyFilters);
    document.getElementById('filterDateTo').addEventListener('change', applyFilters);
}

// Set max date to today (prevent future dates)
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('max', today);
}

// Get expenses from localStorage
function getExpenses() {
    const expenses = localStorage.getItem(EXPENSES_KEY);
    return expenses ? JSON.parse(expenses) : [];
}

// Save expenses to localStorage
function saveExpenses(expenses) {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
}

// Add new expense
function addExpense(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    // Validation
    if (amount <= 0) {
        alert('Amount must be greater than zero!');
        return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        alert('Date cannot be in the future!');
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now().toString(),
        amount: amount,
        category: category,
        date: date,
        description: description,
        timestamp: new Date().toISOString()
    };

    // Add to expenses array
    const expenses = getExpenses();
    expenses.push(expense);
    saveExpenses(expenses);

    // Reset form
    document.getElementById('expenseForm').reset();

    // Reload display
    loadExpenses();
    updateStatistics();
    updateCategoryBreakdown();
    checkBudget();

    // Show success message
    showNotification('Expense added successfully!', 'success');
}

// Load and display expenses
function loadExpenses() {
    const expenses = getExpenses();
    displayExpenses(expenses);
}

// Display expenses in the list
function displayExpenses(expenses) {
    const expensesList = document.getElementById('expensesList');

    if (expenses.length === 0) {
        expensesList.innerHTML = '<p class="no-expenses">No expenses yet. Add your first expense above!</p>';
        return;
    }

    // Sort expenses by date (newest first)
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    expensesList.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-date">${formatDate(expense.date)}</div>
            <div class="expense-details">
                <span class="expense-category">${expense.category}</span>
                ${expense.description ? `<div class="expense-description">${expense.description}</div>` : ''}
            </div>
            <div class="expense-amount">₹${expense.amount.toFixed(2)}</div>
            <button class="btn-delete" onclick="deleteExpense('${expense.id}')">Delete</button>
        </div>
    `).join('');
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Delete expense
function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        let expenses = getExpenses();
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses(expenses);

        loadExpenses();
        updateStatistics();
        updateCategoryBreakdown();
        applyFilters();

        showNotification('Expense deleted successfully!', 'success');
    }
}

// Update statistics dashboard
function updateStatistics() {
    const expenses = getExpenses();

    // Total spent
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalSpent').textContent = `₹${totalSpent.toFixed(2)}`;

    // Transaction count
    document.getElementById('transactionCount').textContent = expenses.length;

    // Update budget status
    updateBudgetStatus(totalSpent);
}

// Update category breakdown
function updateCategoryBreakdown() {
    const expenses = getExpenses();
    const categoryStats = document.getElementById('categoryStats');

    if (expenses.length === 0) {
        categoryStats.innerHTML = '<p class="no-data">No data available</p>';
        return;
    }

    // Calculate spending by category
    const categoryTotals = {};
    expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });

    // Get total for percentage calculation
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Sort categories by amount (highest first)
    const sortedCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1]);

    categoryStats.innerHTML = sortedCategories.map(([category, amount]) => {
        const percentage = (amount / totalSpent) * 100;
        return `
            <div class="category-stat-item">
                <div class="category-stat-name">${category}</div>
                <div class="category-stat-bar-container">
                    <div class="category-stat-bar" style="width: ${percentage}%"></div>
                </div>
                <div class="category-stat-amount">₹${amount.toFixed(2)} (${percentage.toFixed(1)}%)</div>
            </div>
        `;
    }).join('');
}

// Apply filters
function applyFilters() {
    const filterCategory = document.getElementById('filterCategory').value;
    const filterDateFrom = document.getElementById('filterDateFrom').value;
    const filterDateTo = document.getElementById('filterDateTo').value;

    let expenses = getExpenses();

    // Filter by category
    if (filterCategory) {
        expenses = expenses.filter(expense => expense.category === filterCategory);
    }

    // Filter by date range
    if (filterDateFrom) {
        expenses = expenses.filter(expense => expense.date >= filterDateFrom);
    }

    if (filterDateTo) {
        expenses = expenses.filter(expense => expense.date <= filterDateTo);
    }

    displayExpenses(expenses);
}

// Clear all filters
function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterDateFrom').value = '';
    document.getElementById('filterDateTo').value = '';
    loadExpenses();
}

// Budget Management (Bonus Feature)
function setBudget() {
    const budgetInput = document.getElementById('monthlyBudget');
    const budget = parseFloat(budgetInput.value);

    if (isNaN(budget) || budget <= 0) {
        alert('Please enter a valid budget amount!');
        return;
    }

    localStorage.setItem(BUDGET_KEY, budget.toString());
    updateStatistics();
    checkBudget();

    showNotification('Budget set successfully!', 'success');
}

function loadBudget() {
    const budget = localStorage.getItem(BUDGET_KEY);
    if (budget) {
        document.getElementById('monthlyBudget').value = budget;
        updateBudgetStatus(getMonthlyTotal());
    }
}

function getMonthlyTotal() {
    const expenses = getExpenses();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth &&
                   expenseDate.getFullYear() === currentYear;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
}

function updateBudgetStatus(monthlyTotal) {
    const budget = parseFloat(localStorage.getItem(BUDGET_KEY));
    const statusElement = document.getElementById('budgetStatus');

    if (!budget) {
        statusElement.textContent = 'Set Budget';
        statusElement.style.color = '#999';
        return;
    }

    const remaining = budget - monthlyTotal;
    const percentageUsed = (monthlyTotal / budget) * 100;

    if (percentageUsed >= 100) {
        statusElement.textContent = `Over by ₹${Math.abs(remaining).toFixed(2)}`;
        statusElement.style.color = '#ff4757';
    } else if (percentageUsed >= 80) {
        statusElement.textContent = `₹${remaining.toFixed(2)} left`;
        statusElement.style.color = '#ffa502';
    } else {
        statusElement.textContent = `₹${remaining.toFixed(2)} left`;
        statusElement.style.color = '#2ed573';
    }
}

function checkBudget() {
    const budget = parseFloat(localStorage.getItem(BUDGET_KEY));
    if (!budget) return;

    const monthlyTotal = getMonthlyTotal();
    const percentageUsed = (monthlyTotal / budget) * 100;

    // Remove existing alerts
    const existingAlert = document.querySelector('.budget-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Show alert if over budget or near budget
    if (percentageUsed >= 100) {
        showBudgetAlert('⚠️ Budget Exceeded! You have spent more than your monthly budget.', 'budget-alert');
    } else if (percentageUsed >= 80) {
        showBudgetAlert('⚡ Budget Warning! You have used 80% of your monthly budget.', 'budget-alert budget-warning');
    }
}

function showBudgetAlert(message, className) {
    const alert = document.createElement('div');
    alert.className = className;
    alert.textContent = message;

    const container = document.querySelector('.container');
    container.insertBefore(alert, container.children[1]);
}

function showNotification(message, type) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : '#ff4757'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
