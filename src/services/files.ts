import DrupalApiRequest from "../request";
import { File } from "../types";

const serviceUrl = 'file'

export default class Files extends DrupalApiRequest {
  getFileById (id: number) {
    return this.execute<File>(`${serviceUrl}/${id}.json`)
  }
}