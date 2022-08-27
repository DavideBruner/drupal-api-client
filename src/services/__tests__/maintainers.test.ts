import fetchMock from 'fetch-mock';
import Maintainers from '../maintainers';

describe('Maintainers Service', () => {
  const baseUrl = "https://www.drupal.org/project";
  const service = new Maintainers();
  const executeSpy = jest.spyOn(service, "execute");
  const responseMock = [{
    permissions: [],
    name: 'Dries'
  }];

  beforeEach(() => {
    executeSpy.mockClear();
  })

  test('getProjectMaintainers', async () => {
    const projectId = 'drupal';
    const serviceUrl = `${projectId}/maintainers.json`;
    fetchMock.mock(`${baseUrl}/${serviceUrl}`, responseMock);
    const result = await service.getProjectMaintainers(projectId);
    expect(executeSpy).toHaveBeenCalledWith(serviceUrl, { baseUrl });
    expect(result).toStrictEqual(responseMock);
  });
  
})