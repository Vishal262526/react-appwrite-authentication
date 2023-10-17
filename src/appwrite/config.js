import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65229c3607fa4d67276e");

export const account = new Account(client);
export default client;
