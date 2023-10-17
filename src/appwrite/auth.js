import { Account, ID } from "appwrite";
import client from "./config";

class AuthServices {
  account;

  constructor() {
    this.account = new Account(client);
  }

  // Create an new Account
  createUser = async (email, password) => {
    try {
      const res = await this.account.createAccount(
        ID.unique(),
        email,
        password
      );

      return res;
    } catch (e) {
      return null;
    }
  };

  // Login an existing Account
  loginUser = async (email, password) => {
    try {
      const res = await this.account.createEmailSession(email, password);

      return res;
    } catch (e) {
      return null;
    }
  };

  logout = async () => {
    try {
      const res = await this.account.deleteSession("current");
      return true;
    } catch (e) {
      return false;
    }
  };
}
