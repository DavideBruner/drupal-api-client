import DrupalApiRequest from "../request";
import { Filters, Comment, PaginatedResults } from "../types";

const serviceUrl = 'comment.json'

export default class Comments extends DrupalApiRequest {
  getComments (filters?: Filters) {
    return this.execute<PaginatedResults<Comment>>(serviceUrl, { query: filters })
  }

  getCommentById (id: number) {
    return this.execute<PaginatedResults<Comment>>(serviceUrl, { query: { cid: id }}).then(({ list }) => list[0])
  }
}