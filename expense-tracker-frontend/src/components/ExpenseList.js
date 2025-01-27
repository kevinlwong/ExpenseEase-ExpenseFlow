import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [editExpense, setEditExpense] = useState(null);

  const fetchExpenses = async () => {
    const response = await axios.get("http://localhost:5000/expenses");
    const sortedExpenses = response.data.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setExpenses(sortedExpenses);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    // fetchExpenses();
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={toggleSortOrder}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
      </button>

      <ul className="space-y-4">
        {sortedExpenses.map((expense) => (
          <li
            key={expense._id}
            className="flex-col justify-between items-center border border-gray-200 p-4 rounded-md hover:bg-gray-50"
          >
            <div>
              <p className="text-sm text-gray-500">
                {" "}
                {new Date(expense.date).toLocaleDateString()}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {expense.category}
              </p>
              <p className="text-sm text-gray-600">${expense.amount}</p>
            </div>

            <div>
              <button
                className=" bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                onClick={() => setEditExpense(expense)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium m-3"
                onClick={() => handleDelete(expense._id)}
              >
                Delete
              </button>
            </div>

            {editExpense?._id === expense._id && (
  <div className="mt-4 p-4 border border-gray-300 bg-gray-50 rounded-md">
    <h3 className="text-md font-medium text-gray-700 mb-2">Edit Expense</h3>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // Update the expense in the backend
        await axios.put(
          `http://localhost:5000/expenses/${editExpense._id}`,
          editExpense
        );
        // Update the expense in the state
        setExpenses((prev) =>
          prev.map((exp) =>
            exp._id === editExpense._id ? editExpense : exp
          )
        );
        setEditExpense(null); // Close the form
      }}
      className="flex flex-wrap gap-4 sm:gap-2"
    >
      {/* Date Field */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm sm:text-xs font-medium text-gray-600">Date</label>
        <input
          type="date"
          value={new Date(editExpense.date).toISOString().split('T')[0]}
          onChange={(e) =>
            setEditExpense({ ...editExpense, date: e.target.value })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Category Field */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm sm:text-xs font-medium text-gray-600">Category</label>
        <input
          type="text"
          value={editExpense.category}
          onChange={(e) =>
            setEditExpense({ ...editExpense, category: e.target.value })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Amount Field */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm sm:text-xs font-medium text-gray-600">Amount</label>
        <input
          type="number"
          value={editExpense.amount}
          onChange={(e) =>
            setEditExpense({ ...editExpense, amount: e.target.value })
          }
          className="mt-1 block w-full p-2 sm:p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-xs"
        />
      </div>

      {/* Description Field */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm sm:text-xs font-medium text-gray-600">Description</label>
        <input
          type="text"
          value={editExpense.description || ''}
          onChange={(e) =>
            setEditExpense({ ...editExpense, description: e.target.value })
          }
          className="mt-1 block w-full p-2 sm:p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-xs"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-2 mt-4 w-full">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-2 py-2 sm:py-1 rounded-md text-sm sm:text-xs font-medium"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditExpense(null)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-2 py-2 sm:py-1 rounded-md text-sm sm:text-xs font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default ExpenseList;
