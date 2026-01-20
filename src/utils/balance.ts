import { ExpenseType } from '../hooks/expenses/useExpenses';

interface Transaction {
  from: string;
  to: string;
  amount: number;
}

/**
 * Calculate balance nett for each user
 * Payer receive: amount - (amount / participants)
 * The remaining participants are charged the amount : amount / participants
 * @param expenses
 */
export const computeNetBalances = (
  expenses: ExpenseType[]
): Record<string, number> => {
  const balances: Record<string, number> = {};

  expenses.forEach((expense) => {
    const { amount, participants, payer, evenSplit } = expense;
    if (evenSplit) {
      const share = amount / participants.length;

      // Ensure payer is in balances
      if (!balances[payer]) {
        balances[payer] = 0;
      }

      participants.forEach((participant) => {
        // Init balance
        if (!balances[participant]) {
          balances[participant] = 0;
        }

        // Payer gets the money back
        if (participant === payer) {
          balances[participant] += amount - share;
        } else {
          // Others are charged their share
          balances[participant] -= share;
        }
      });

      // Special case: Payer is NOT a participant
      if (!participants.includes(payer)) {
        balances[payer] += amount;
      }
    }
    // Placeholder for payment percentage
  });

  return balances;
};

/**
 * It determines settlement transactions using a greedy algorithm.
 * First, we create two lists: creditors (with positive balances) and debtors (with negative balances).
 * Then, we iteratively establish transactions until all balances are settled.
 * @param balances
 */
export const settleBalances = (
  balances: Record<string, number>
): Transaction[] => {
  const creditors: { id: string; balance: number }[] = [];
  const debtors: { id: string; balance: number }[] = [];

  for (const [id, balance] of Object.entries(balances)) {
    if (balance > 0) {
      creditors.push({ id, balance });
    } else if (balance < 0) {
      debtors.push({ id, balance: -balance }); // convert the negative balance into a positive value
    }
  }

  // sort creditors and debtors in descending order based on their balance
  creditors.sort((a, b) => b.balance - a.balance);
  debtors.sort((a, b) => b.balance - a.balance);

  const transactions: Transaction[] = [];

  while (creditors.length > 0 && debtors.length > 0) {
    const creditor = creditors[0];
    const debtor = debtors[0];
    const payment = Math.min(creditor.balance, debtor.balance);

    transactions.push({
      from: debtor.id,
      to: creditor.id,
      amount: parseFloat(payment.toFixed(2)),
    });

    // update the balances
    creditor.balance -= payment;
    debtor.balance -= payment;

    if (Math.abs(creditor.balance) < 0.01) creditors.shift();
    if (Math.abs(debtor.balance) < 0.01) debtors.shift();
  }

  return transactions;
};
