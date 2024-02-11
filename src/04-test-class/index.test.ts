import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  getBankAccount,
} from '.';

const initialBalance = 12;

let bankAccount: BankAccount | null = null;

describe('BankAccount', () => {
  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    const localBankAccount: BankAccount = getBankAccount(initialBalance);

    expect(localBankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount?.withdraw(initialBalance + 10);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount?.transfer(initialBalance + 10, getBankAccount(0));
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount?.transfer(initialBalance, bankAccount);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositNum = 33;

    expect(bankAccount?.deposit(depositNum).getBalance()).toEqual(
      initialBalance + depositNum,
    );
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
