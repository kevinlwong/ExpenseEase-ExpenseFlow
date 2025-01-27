const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
