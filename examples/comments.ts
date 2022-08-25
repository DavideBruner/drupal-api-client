import DrupalApiClient from "../src";
import { Comment } from "../src/types";

const client = new DrupalApiClient();

async function getComments() {
  const result = await client.getComments();
  console.log(result);
}

async function getCommentById() {
  const result: Comment = await client.getCommentById(20);
  console.log(result);
}

getComments();
getCommentById();