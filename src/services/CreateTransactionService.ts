import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const createTransactions = this.transactionsRepository.create({ title, type, value });

    if (createTransactions.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total - createTransactions.value < 0) {
        throw Error('Saldo insuficiente!');
      }
    }

    return createTransactions;
  }
}

export default CreateTransactionService;
