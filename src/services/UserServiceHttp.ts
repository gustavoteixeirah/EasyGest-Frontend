import HttpClient from "../infra/http/HttpClient";
import UserService from "./UserService";

export default class UserServiceHttp implements UserService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
        
    }
    async register(fullName: string, username: string, email: string, password: string): Promise<any> {
        
        const session = await this.httpClient.post(
          `${this.baseUrl}/users`,
          { fullName, username, email, password }
        );
        return session.data;
    }
    


}
