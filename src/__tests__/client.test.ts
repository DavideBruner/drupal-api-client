import DrupalApiClient from "..";

describe('DrupalApiClient', () => {
  const baseUrl = 'http://www.site.com';
  const drupalApiUrl = 'https://www.drupal.org/api-d7';
  
  test('client constructor with default baseUrl', () => {
    const service = new DrupalApiClient();
    expect(service).toHaveProperty('baseUrl', drupalApiUrl);
    expect(service).toHaveProperty('execute');
  });

  test('client constructor with custom baseUrl', () => {
    const service = new DrupalApiClient({ baseUrl });
    expect(service).toHaveProperty('baseUrl', baseUrl);
    expect(service).toHaveProperty('execute');
  });

  test('check if mixins have been applied to the client', () => {
    const service = new DrupalApiClient({ baseUrl });
    expect(service).toHaveProperty('baseUrl', baseUrl);
    expect(service).toHaveProperty('getUsers');
    expect(service).toHaveProperty('getUserById');
    expect(service).toHaveProperty('getUserByUsername');
    expect(service).toHaveProperty('getNodes');
    expect(service).toHaveProperty('getNodeById');
    expect(service).toHaveProperty('getNodesByType');
    expect(service).toHaveProperty('getFileById');
    expect(service).toHaveProperty('getProjectMaintainers');
    expect(service).toHaveProperty('getComments');
    expect(service).toHaveProperty('getCommentById');
    expect(service).toHaveProperty('getCiJobs');
    expect(service).toHaveProperty('getCiJobById');
  });
  
})