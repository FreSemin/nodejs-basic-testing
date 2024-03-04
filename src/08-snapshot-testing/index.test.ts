// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const dataForList = [
    {
      id: 1,
      name: 'user1',
    },
    {
      id: 2,
      name: 'user2',
    },
  ];
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([...dataForList]);

    expect(linkedList).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([...dataForList]);

    expect(linkedList).toMatchSnapshot();
  });
});
