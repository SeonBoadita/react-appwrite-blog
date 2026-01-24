import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.projectId); // Your project ID
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.loginAccount({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error :: createAccount:", error);
        }
    }

    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Error :: loginAccount:", error);
        }
        return null;
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error :: getCurrentUser:", error);
        }
        return null;
    }

    async logoutAccount() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Error :: logoutAccount:", error);
        }
        return null;
    }
}
const authService = new AuthService();
export default authService;