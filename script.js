const API_KEY='ebed3d7baf034058867df64973139832';  
const BASE='INR';
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('expense-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const amount=parseFloat(document.getElementById('amount').value);
        const category=document.getElementById('category').value;
        const date=document.getElementById('date').value;
        const currency=document.getElementById('currency').value;
        if(isNaN(amount) || !category || !date || !currency){
            alert('Please fill out all fields correctly.');
            return;
        }
        try{
            const response=await fetch(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`);
            const data=await response.json();
            const rates=data.rates;
            const rate=rates[currency];

            if(!rate){
                alert('Invalid currency code.');
                return;
            }

            const convertedAmount=amount/rate*rates[BASE];

            const expense={
                amount,
                category,
                date,
                currency,
                convertedAmount
            };

            let expenses=localStorage.getItem('expenses');
            if (expenses){
                expenses=JSON.parse(expenses);
            } else {
                expenses=[];
            }

            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            document.getElementById('expense-form').reset();
            alert('Expense added successfully!');
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            alert('Failed to fetch exchange rates. Please try again later.');
        }
    });
    document.getElementById('remove').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('expenses');
        alert('Expenses cleared from localStorage.');
    });
});