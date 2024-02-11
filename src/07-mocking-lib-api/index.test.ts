import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/posts/1';

  const mockData = [
    {
      id: 1,
      postTitle: 'title 1',
    },
    {
      id: 2,
      postTitle: 'title 2',
    },
  ];

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyAxiosCreate: jest.SpyInstance = jest.spyOn(axios, 'create');

    expect(spyAxiosCreate).not.toBeCalled();

    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi(relativePath);

    expect(spyAxiosCreate).toHaveBeenNthCalledWith(1, { baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosGet: jest.SpyInstance = jest.spyOn(
      axios.Axios.prototype,
      'get',
    );
    spyAxiosGet.mockImplementationOnce(() => []);

    expect(spyAxiosGet).not.toBeCalled();

    await throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(spyAxiosGet).toHaveBeenNthCalledWith(1, relativePath);
  });

  test('should return response data', async () => {
    expect.assertions(3);

    const spyAxiosGet: jest.SpyInstance = jest.spyOn(
      axios.Axios.prototype,
      'get',
    );
    spyAxiosGet.mockImplementationOnce(() => {
      return Promise.resolve({ data: mockData });
    });

    expect(spyAxiosGet).not.toBeCalled();

    const response = await throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(spyAxiosGet).toHaveBeenNthCalledWith(1, relativePath);
    expect(response).toEqual(mockData);
  });
});
