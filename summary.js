window.onload = function() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const categories = [];
    const amounts = [];

    expenses.forEach(expense => {
        const index = categories.indexOf(expense.category);
        if (index === -1) {
            categories.push(expense.category);
            amounts.push(expense.convertedAmount);
        } else {
            amounts[index] += expense.convertedAmount;
        }
    });

    const ctx = document.getElementById('expenseChart').getContext('2d');
    const expenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses (in INR)',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};
