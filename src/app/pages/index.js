"use client";  // Ensures component runs only on the client

import React, { useState, useEffect } from "react";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  // Prevents hydration errors
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => setTransactions([]));  // Default empty state
  }, []);

  const addTransaction = async (transaction) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    const newTransaction = await res.json();
    setTransactions([...transactions, newTransaction]);
  };

  if (!isClient) return null; // Prevents hydration mismatch

  return (
    <div>
      <h1>Personal Finance Visualizer</h1>
      <TransactionForm onSubmit={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Home;
