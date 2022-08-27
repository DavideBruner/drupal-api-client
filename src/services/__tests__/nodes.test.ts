import fetchMock from 'fetch-mock';
import { NodeType } from '../../types';
import Nodes from '../nodes';

describe('Nodes Service', () => {
  const service = new Nodes();
  const serviceUrl = 'node.json';
  const executeSpy = jest.spyOn(service, "execute");
  const responseMock = {
    list: [{ nid: 1 }]
  };

  beforeEach(() => {
    executeSpy.mockClear();
  })

  test('getNodes', async () => {    
      fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}`, responseMock);
      const result = await service.getNodes();
      expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query: undefined });
      expect(result).toStrictEqual(responseMock);
  });

  test('getNodes with query filters', async () => {
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?created=1011384297`, responseMock);
    const query = { created: '1011384297' };
    const result = await service.getNodes(query);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock);
  });

  test('getNodeById', async () => {
    const id = 123;
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?nid=${id}`, responseMock);
    const query = { nid: id };
    const result = await service.getNodeById(id);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock.list[0]);
  });


  test('getNodesByType', async () => {
    const type = NodeType.BOOK;
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?type=${type}`, responseMock);
    const query = { type };
    const result = await service.getNodesByType(type);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock);
  });
  
})