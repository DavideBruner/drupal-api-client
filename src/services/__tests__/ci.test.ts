import fetchMock from 'fetch-mock';
import CI from '../ci';

describe('CI Service', () => {
  const service = new CI();
  const serviceUrl = 'pift_ci_job.json';
  const executeSpy = jest.spyOn(service, "execute");
  const responseMock = {
    list: [{ cid: 1 }]
  };

  beforeEach(() => {
    executeSpy.mockClear();
  })

  test('getCiJobs', async () => {    
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}`, responseMock);
    const result = await service.getCiJobs();
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query: undefined });
    expect(result).toStrictEqual(responseMock);
  });

  test('getCiJobs with query filters', async () => {
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}?created=1011384297`, responseMock);
    const query = { created: '1011384297' };
    const result = await service.getCiJobs(query);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { query });
    expect(result).toStrictEqual(responseMock);
  });

  test('getCiJobById', async () => {
    const id = 123;
    const serviceUrl = `pift_ci_job/${id}.json`;
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}`, responseMock.list[0]);
    const result = await service.getCiJobById(id);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl);
    expect(result).toStrictEqual(responseMock.list[0]);
  });
  
})