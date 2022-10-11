import HttpClient from "../infra/http/HttpClient";
import ServiceService from "./ServiceService";

export default class ServiceServiceHttp implements ServiceService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
        
    }
    async create(name: string, price: string, durationInMinutes: number): Promise<any> {
        const description = name;
      const session = await this.httpClient.post(`${this.baseUrl}/services`, {
        description,
        price,
        durationInMinutes,
      });
      return session;
    }

    async list(): Promise<any> {
        const services = await this.httpClient.get(`${this.baseUrl}/services`);

        return services;
    }

}
