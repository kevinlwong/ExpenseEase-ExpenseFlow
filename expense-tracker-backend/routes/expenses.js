const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add an expense
router.post('/', async (req, res) => {
    const { date, category, amount, description } = req.body;
    try {
        const newExpense = new Expense({ date, category, amount, description });
        await newExpense.save();
        res.json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an expense
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {date, category, amount, description} = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            {date, category, amount, description},
            {new: true, runValidators: true}
        );

        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found'});
        }
        
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
