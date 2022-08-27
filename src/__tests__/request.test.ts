import fetchMock from 'fetch-mock';
import qs from 'querystringify';
import DrupalApiRequest from '../request';
import { PaginatedResults } from '../types';

describe('DrupalApiRequest', () => {
  const baseUrl = 'http://www.site.com';
  const drupalApiUrl = 'https://www.drupal.org/api-d7';
  const stringifyMock = jest.spyOn(qs, 'stringify');
  const responseMock = {
    list: [{ nid: 1 }, { nid: 2 }, { nid: 3 }, { nid: 4 }],
    prev: `${baseUrl}/api-test?page=1`,
    next: `${baseUrl}/api-test?page=3`,
    last: `${baseUrl}/api-test?page=4`,
    first: `${baseUrl}/api-test?page=1`,
  };

  beforeEach(() => {
    fetchMock.reset();
  })

  test('client constructor with default baseUrl', async () => {
    const service = new DrupalApiRequest();
    expect(service).toHaveProperty('baseUrl', drupalApiUrl);
    expect(service).toHaveProperty('execute');
  });

  test('client constructor with custom baseUrl', async () => {
    const service = new DrupalApiRequest({ baseUrl });
    expect(service).toHaveProperty('baseUrl', baseUrl);
    expect(service).toHaveProperty('execute');
  });

  test('execute', async () => {
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const result = await service.execute('api-test');
    expect(result).toStrictEqual(responseMock);
  });

  test('execute with overriden baseUrl', async () => {
    const httpRequest = `begin:${drupalApiUrl}`;
    fetchMock.mock(httpRequest, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    expect(service).toHaveProperty('baseUrl', baseUrl);
    expect(fetchMock.called(httpRequest)).toBeFalsy();
    const result = await service.execute('api-test', { baseUrl: drupalApiUrl });
    expect(result).toStrictEqual(responseMock);
    expect(fetchMock.done(httpRequest)).toBeTruthy();
    expect(stringifyMock).not.toHaveBeenCalled();
  });

  test('execute with query params', async () => {
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const endpoint = 'api-test';
    const query = { test: 'value' };
    const result = await service.execute(endpoint, { query });
    expect(result).toStrictEqual(responseMock);
    expect(fetchMock.lastUrl()).toBe(`${baseUrl}/${endpoint}?test=value`)
    expect(stringifyMock).toHaveBeenCalledWith(query, '?');
  });

  test('execute with params', async () => {
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const endpoint = 'api-test';
    const params = {
      headers: [],
      method: "PUT",
      body: JSON.stringify({ test: 'value' })
    }
    const result = await service.execute(endpoint, { init: params });
    expect(result).toStrictEqual(responseMock);
    expect(fetchMock.lastUrl()).toBe(`${baseUrl}/${endpoint}`)
    expect(fetchMock.lastOptions()).toBe(params)
  });

  test('execute with errors', async () => {
    const responseMock = { status: 404 };
    fetchMock.mock(`begin:${drupalApiUrl}`, responseMock);
    const service = new DrupalApiRequest();
    try {
      await service.execute('api-test')
    } catch (e) {
      expect(e).toMatch('Not Found');
    }
  });

  test('prev', async () => {
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const endpoint = 'api-test';
    const result = await service.execute<PaginatedResults<any>>(endpoint);
    await service.prev(result);
    expect(fetchMock.lastUrl()).toBe(`${baseUrl}/${endpoint}.json?page=1`);
  });

  test('next', async () => {    
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const endpoint = 'api-test';
    const result = await service.execute<PaginatedResults<any>>(endpoint);
    await service.next(result);
    expect(fetchMock.lastUrl()).toBe(`${baseUrl}/${endpoint}.json?page=3`);
  });

  test('last', async () => {
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const endpoint = 'api-test';
    const result = await service.execute<PaginatedResults<any>>(endpoint);
    await service.last(result);
    expect(fetchMock.lastUrl()).toBe(`${baseUrl}/${endpoint}.json?page=4`);
  });

  test('first', async () => { 
    fetchMock.mock(`begin:${baseUrl}`, responseMock); 
    const service = new DrupalApiRequest({ baseUrl });
    const endpoint = 'api-test';
    const result = await service.execute<PaginatedResults<any>>(endpoint);
    await service.first(result);
    expect(fetchMock.lastUrl()).toBe(`${baseUrl}/${endpoint}.json?page=1`);
  });
  
})