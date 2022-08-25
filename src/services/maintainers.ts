import DrupalApiRequest from "../request";
import { Maintainer } from "../types";

const serviceUrl = 'maintainers.json'

export default class Maintainers extends DrupalApiRequest {
  getProjectMaintainers (projectId: string) {
    return this.execute<Maintainer[]>(`${projectId}/${serviceUrl}`, { baseUrl: 'https://www.drupal.org/project' })
  }
}