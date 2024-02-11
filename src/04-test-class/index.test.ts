import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 12;
  let bankAccount: BankAccount | null = null;

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
    const withdrawNum = 10;

    expect(bankAccount?.withdraw(withdrawNum).getBalance()).toEqual(
      initialBalance - withdrawNum,
    );
  });

  test('should transfer money', () => {
    const transferToAccount = getBankAccount(0);

    expect(
      bankAccount?.transfer(initialBalance - 2, transferToAccount).getBalance(),
    ).toEqual(2);
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
