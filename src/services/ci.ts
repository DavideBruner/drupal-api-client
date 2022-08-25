import DrupalApiRequest from "../request";
import { CIJob, Filters, PaginatedResults } from "../types";

const serviceUrl = 'pift_ci_job'

export default class CI extends DrupalApiRequest {
  getCiJobs (filters?: Filters) {
    return this.execute<PaginatedResults<CIJob>>(`${serviceUrl}.json`, { query: filters })
  }

  getCiJobById (id: number) {
    return this.execute<CIJob>(`${serviceUrl}/${id}.json`)
  }
}