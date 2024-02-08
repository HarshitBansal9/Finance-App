const { Router } = require('express');
const Expense = require('../database/schemas/expenses');
const router = Router();
router.get('/list', async (request, response) => {
    if (request.session.user) {
        let expenses = 0;
        const expenseDB = await Expense.find({ "user": request.session.user.username });
        for (i of expenseDB) {
            expenses += i.expense;
        }
        response.json({
            "expenses": expenseDB,
            "total": expenses
        })
    } else {
        response.send('Not logged in');
    }
});

router.post('/create', async (request, response) => {
    if (request.session.user) {
        const { expense, category } = request.body;
        const newExpense = await Expense.create({ expense, category, user: request.session.user.username });
        response.status(200).json(newExpense);
    } else {
        response.send('Not logged in');
    }
});

module.exports = router;