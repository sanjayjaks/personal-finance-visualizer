import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

type Transaction = {
  _id?: string;
  amount: number;
  date: string;
  description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('personal-finance');
    const collection = db.collection<Transaction>('transactions');

    if (req.method === 'GET') {
      const transactions = await collection.find({}).toArray();
      res.status(200).json(transactions);
    } else if (req.method === 'POST') {
      const transaction: Transaction = req.body;
      const result = await collection.insertOne(transaction);
      res.status(201).json({ _id: result.insertedId, ...transaction });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id as string) });
      res.status(204).end();
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const transaction: Transaction = req.body;
      await collection.updateOne({ _id: new ObjectId(id as string) }, { $set: transaction });
      res.status(200).json(transaction);
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}