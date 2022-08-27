import fetchMock from 'fetch-mock';
import Files from '../files';

describe('Files Service', () => {
  const service = new Files();
  const executeSpy = jest.spyOn(service, "execute");
  const responseMock = {
    fid: 1,
    name: 'fake-file-name'
  };

  beforeEach(() => {
    executeSpy.mockClear();
  })

  test('getFileById', async () => {
    const id = 123;
    const serviceUrl = `file/${id}.json`;
    fetchMock.mock(`https://www.drupal.org/api-d7/${serviceUrl}`, responseMock);
    const result = await service.getFileById(id);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl);
    expect(result).toStrictEqual(responseMock);
  });
  
})