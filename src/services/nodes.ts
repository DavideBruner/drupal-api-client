import DrupalApiRequest from "../request";
import { Filters, NodeType, Node, PaginatedResults } from "../types";

const serviceUrl = 'node.json'

export default class Nodes extends DrupalApiRequest {
  getNodes (filters?: Filters) {
    return this.execute<PaginatedResults<Node>>(serviceUrl, { query: filters })
  }

  getNodeById (id: number) {
    return this.execute<PaginatedResults<Node>>(serviceUrl, { query: { nid: id }}).then(({ list }) => list[0])
  }

  getNodesByType (type: NodeType) {
    return this.execute<PaginatedResults<Node>>(serviceUrl, { query: { type }})
  }
}