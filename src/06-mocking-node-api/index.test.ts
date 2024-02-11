import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const timeout = 500;

  let callback: jest.Mock = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy: jest.SpyInstance = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const interval = 500;

  let callback: jest.Mock = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy: jest.SpyInstance = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(spy).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * 3);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
