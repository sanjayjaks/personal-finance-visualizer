"use client";

import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => setError(error.message));
  }, []);

  const addTransaction = (transaction) => {
    fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((newTransaction) => setTransactions([...transactions, newTransaction]))
      .catch((error) => setError(error.message));
  };

  const deleteTransaction = (id) => {
    fetch(`/api/transactions?id=${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      })
      .catch((error) => setError(error.message));
  };

  const editTransaction = (updatedTransaction) => {
    fetch(`/api/transactions?id=${updatedTransaction._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setTransactions(transactions.map((transaction) =>
          transaction._id === updatedTransaction._id ? updatedTransaction : transaction
        ));
      })
      .catch((error) => setError(error.message));
  };

  const monthlyExpenses = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) acc[month] = 0;
    acc[month] += transaction.amount;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyExpenses).map((month) => ({
    month,
    amount: monthlyExpenses[month],
  }));

  return (
    <div>
      <h1>Personal Finance Visualizer</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TransactionForm onSubmit={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} onEdit={editTransaction} />
      <MonthlyExpensesChart data={chartData} />
    </div>
  );
};

export default Home;