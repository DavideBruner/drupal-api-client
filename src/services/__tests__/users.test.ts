import fetchMock from 'fetch-mock';
import Users from '../users';

describe('Users Service', () => {
  const service = new Users();
  const serviceUrl = 'user.json';
  const executeSpy = jest.spyOn(service, "execute");
  const responseMock = {
    list: [{ uid: 1 }]
  };

  beforeEach(() => {
    executeSpy.mockClear();
  })

  test('getUsers', async () => {    
      fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}`, responseMock);
      const result = await service.getUsers();
      expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query: undefined });
      expect(result).toStrictEqual(responseMock);
  });

  test('getUsers with query filters', async () => {
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?created=1011384297`, responseMock);
    const query = { created: '1011384297' };
    const result = await service.getUsers(query);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock);
  });

  test('getUserById', async () => {
    const id = 123;
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?uid=${id}`, responseMock);
    const query = { uid: id };
    const result = await service.getUserById(id);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock.list[0]);
  });

  test('getUserByUsername', async () => {
    const name = 'DavideBru';
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?name=${name}`, responseMock);
    const query = { name };
    const result = await service.getUserByUsername(name);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock.list[0]);
  });
  
})