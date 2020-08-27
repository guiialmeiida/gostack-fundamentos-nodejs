import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsDTO {
  transactions: TransactionDTO[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsDTO {
    const transactionDTO = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactionDTO;
  }

  public getBalance(): Balance {
    let incomes = 0;
    let outcomes = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomes += transaction.value;
      }
    });

    this.transactions.forEach(transaction => {
      if (transaction.type === 'outcome') {
        outcomes += transaction.value;
      }
    });

    const balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };
    return balance;
  }

  public create({ title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
