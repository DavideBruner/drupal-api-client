import fetchMock from 'fetch-mock';
import Comments from '../comments';

describe('Comments Service', () => {
  const service = new Comments();
  const serviceUrl = 'comment.json';
  const executeSpy = jest.spyOn(service, "execute");
  const responseMock = {
    list: [{ cid: 1 }]
  };

  beforeEach(() => {
    executeSpy.mockClear();
  })

  test('getComments', async () => {    
      fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}`, responseMock);
      const result = await service.getComments();
      expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query: undefined });
      expect(result).toStrictEqual(responseMock);
  });

  test('getComments with query filters', async () => {
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?created=1011384297`, responseMock);
    const query = { created: '1011384297' };
    const result = await service.getComments(query);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock);
  });

  test('getCommentById', async () => {
    const id = 123;
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?cid=${id}`, responseMock);
    const query = { cid: id };
    const result = await service.getCommentById(id);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock.list[0]);
  });
  
})