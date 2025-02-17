"use client";

import React from 'react';

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
};

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, onEdit }) => {
  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          {transaction.date} - {transaction.description} - ${transaction.amount}
          <button onClick={() => onEdit(transaction)}>Edit</button>
          <button onClick={() => onDelete(transaction._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;