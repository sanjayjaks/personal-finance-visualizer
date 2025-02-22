# Personal Finance Visualizer

## Overview
Personal Finance Visualizer is a web application built using **Next.js, React, Node.js, MongoDB, and Tailwind CSS**. This app helps users track their expenses, visualize monthly spending, and manage transactions efficiently.

## Features
- **Add, Edit, and Delete Transactions**
- **Visualize Monthly Expenses with Charts**
- **Server-Side Rendering (SSR) and API Integration**
- **Styled with Tailwind CSS**
- **Persisted Data using MongoDB**

## Tech Stack
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation
### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/sanjayjaks/personal-finance-visualizer.git
   cd personal-finance-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## API Routes
### Get Transactions
```http
GET /api/transactions
```
### Add Transaction
```http
POST /api/transactions
```
**Request Body:**
```json
{
  "title": "Grocery Shopping",
  "amount": 50,
  "date": "2024-09-28"
}
```
### Edit Transaction
```http
PUT /api/transactions?id=transactionId
```
### Delete Transaction
```http
DELETE /api/transactions?id=transactionId
```

## Troubleshooting
### Fix Tailwind CSS Warning
If you see a warning about missing `content` configuration, update `tailwind.config.js`:
```js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
### Fix Hydration Error
If you encounter a hydration error, wrap client-side only logic like this:
```js
if (typeof window !== 'undefined') {
  // Client-side logic
}
```

## Contributing
Feel free to fork the repository, make improvements, and submit a pull request.

## License
This project is open-source under the MIT License.

