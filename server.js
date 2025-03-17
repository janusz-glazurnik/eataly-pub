const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

let expenses = require('./mockendData/expenses.json');
let users = require('./mockendData/users.json');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/api/expenses', (_, res) => res.send(expenses));

app.get('/api/users', (_, res) => res.send(users));

app.post(
  '/api/expenses',
  body('currency').isIn(['USD', 'CHF', 'GBP', 'EUR']),
  body('amount').isNumeric(),
  body('description').isString(),
  body('evenSplit').isBoolean(),
  body('participants').isArray(),
  body('payer').isString(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { currency, amount, description, evenSplit, participants, payer } =
      req.body;

    const newExpense = {
      id: uuidv4(),
      timestamp: new Date(),
      payer,
      currency,
      amount,
      description,
      evenSplit,
      participants,
    };

    expenses = {
      expenses: [newExpense, ...expenses.expenses],
    };
    res.send(newExpense);
  }
);

app.listen(PORT, () =>
  console.log(
    `mock transactions HTTP API server running at http://localhost:${PORT}`
  )
);
