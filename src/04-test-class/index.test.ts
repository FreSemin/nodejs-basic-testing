import { BankAccount, getBankAccount } from '.';

const initialBalance = 12;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const localBankAccount: BankAccount = getBankAccount(initialBalance);

    expect(localBankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
  });

  test('should deposit money', () => {
    // Write your test here
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
