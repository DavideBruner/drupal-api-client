import DrupalApiClient from "../src";
import { User } from "../src/types";

const client = new DrupalApiClient();

async function getUser() {
  const result: User = await client.getUserByUsername('DavideBru');
  console.log(result);
}

getUser();