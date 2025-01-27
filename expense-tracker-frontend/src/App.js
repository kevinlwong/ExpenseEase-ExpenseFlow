import React from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8">
      <Header />
      
      <ExpenseForm refreshExpenses={() => window.location.reload()} />
      <ExpenseList />
    </div>
  );
};

export default App;