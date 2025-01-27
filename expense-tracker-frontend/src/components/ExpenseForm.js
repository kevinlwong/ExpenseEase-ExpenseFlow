import React, {useState} from 'react';
import axios from 'axios';

const ExpenseForm = ({ refreshExpenses}) => {
    const [formData, setFormData] = useState({
        date: '',
        category: '',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/expenses', formData);
        setFormData({ date: '', category: '', amount: '', description: '' });
        refreshExpenses(); // Reload expenses after submission
    };

    return (
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
            <input type="date" className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200" name="date" value={formData.date} onChange={handleChange} required />
            <input type="text" className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200" name="category" value={formData.category} onChange={handleChange} required placeholder="Category" />
            <input type="number" className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200" name="amount" value={formData.amount} onChange={handleChange} required placeholder="Amount" />
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200" rows="3" name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
            <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600" type="submit">Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;