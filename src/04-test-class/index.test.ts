import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 12;
  let bankAccount: BankAccount = getBankAccount(initialBalance);

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(initialBalance).getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(initialBalance + 10);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(initialBalance + 10, getBankAccount(0));
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(initialBalance, bankAccount);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositNum = 33;

    expect(bankAccount.deposit(depositNum).getBalance()).toEqual(
      initialBalance + depositNum,
    );
  });

  test('should withdraw money', () => {
    const withdrawNum = 10;

    expect(bankAccount.withdraw(withdrawNum).getBalance()).toEqual(
      initialBalance - withdrawNum,
    );
  });

  test('should transfer money', () => {
    const transferToAccount = getBankAccount(0);

    expect(
      bankAccount.transfer(initialBalance - 2, transferToAccount).getBalance(),
    ).toEqual(2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);

    const spy = jest.spyOn(lodash, 'random');

    spy.mockReturnValueOnce(33);
    spy.mockReturnValueOnce(1);

    await expect(typeof (await bankAccount.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(1);

    const spy = jest.spyOn(lodash, 'random');
    const expectedBalance = 33;

    spy.mockReturnValueOnce(expectedBalance);
    spy.mockReturnValueOnce(1);

    await bankAccount.synchronizeBalance();

    await expect(bankAccount.getBalance()).toBe(expectedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);

    const spy = jest.spyOn(lodash, 'random');

    spy.mockReturnValueOnce(33);
    spy.mockReturnValueOnce(0);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
