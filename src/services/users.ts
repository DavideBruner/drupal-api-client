import DrupalApiRequest from "../request";
import { Filters, User, PaginatedResults } from "../types";

const serviceUrl = 'user.json'

export default class Users extends DrupalApiRequest {
  getUsers (filters?: Filters) {
    return this.execute<PaginatedResults<User>>(serviceUrl, { query: filters })
  }

  getUserById (id: number) {
    return this.execute<PaginatedResults<User>>(serviceUrl, { query: { uid: id }}).then(({ list }) => list[0])
  }

  getUserByUsername (name: string) {
    return this.execute<PaginatedResults<User>>(serviceUrl, { query: { name }}).then(({ list }) => list[0])
  }
}