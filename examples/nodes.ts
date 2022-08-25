import DrupalApiClient from "../src";
import { NodeType, PaginatedResults } from "../src/types";

const client = new DrupalApiClient();

async function getCoreProjects() {
  const result = await client.getNodesByType(NodeType.PROJECT_CORE);
  console.log(result);
}

async function getIssueProjects() {
  const result = await client.getNodesByType(NodeType.PROJECT_ISSUE);
  console.log(result);
}

async function getModuleProjectsNames() {
  const result = await client.getNodesByType(NodeType.PROJECT_MODULE).then(({ list }) => list.map(({ title }) => title));
  console.log(result);
}

async function getFilteredProjects() {
  const result = await client.getNodes({ type: NodeType.PROJECT_ISSUE, is_new: true });
  console.log(result);
}

function logList({ list }: PaginatedResults<{ title: string }>) {
  list.forEach((el) => console.log(el.title));
}

async function getPaginatedProjects() {
  // You can either use the utiltity functions provided by the library like below
  const result = await client.getNodes({ type: NodeType.PROJECT_ISSUE });
  logList(result);
  
  const nextResult = await client.next(result);
  logList(nextResult);

  const nextNextResult = await client.next(nextResult);
  logList(nextNextResult);

  // or just pass the page as argument of the call
  const page_0 = await client.getNodes({ type: NodeType.PROJECT_ISSUE });
  logList(page_0);
  
  const page_1 = await client.getNodes({ type: NodeType.PROJECT_ISSUE, page: 1 });
  logList(page_1);

  const page_2 = await client.getNodes({ type: NodeType.PROJECT_ISSUE, page: 2 });
  logList(page_2);
}
