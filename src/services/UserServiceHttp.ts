import HttpClient from "../infra/http/HttpClient";
import UserService from "./UserService";

export default class UserServiceHttp implements UserService {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}
    async listUsers(): Promise<any> {
        const session = await this.httpClient.get(`${this.baseUrl}/users/regular-users`);
    
        return session.data;
    }
    async deletePartner(id: string): Promise<any> {
        const session = await this.httpClient.delete(
          `${this.baseUrl}/users/${id}`,
        );
        return session;
    }
  async updatePartner(
    id: string,
    fullName: string,
    email: string,
    password: string,
    cnpj: string
  ): Promise<any> {
    const username = email;
    const session = await this.httpClient.put(
      `${this.baseUrl}/users/partners/${id}`,
      { fullName, username, email, password, cnpj }
    );
    return session;
  }
  async createPartner(
    fullName: string,
    email: string,
    password: string,
    cnpj: string
  ): Promise<any> {
    const username = email;
    const session = await this.httpClient.post(
      `${this.baseUrl}/users/partners`,
      { fullName, username, email, password, cnpj }
    );
    return session;
  }
  async listPartners(): Promise<any> {
    const session = await this.httpClient.get(`${this.baseUrl}/users/partners`);

    return session.data;
  }

  async register(
    fullName: string,
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const session = await this.httpClient.post(`${this.baseUrl}/users`, {
      fullName,
      username,
      email,
      password,
    });
    return session.data;
  }
}
