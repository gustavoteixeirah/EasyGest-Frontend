import HttpClient from "../infra/http/HttpClient";
import ProductService from "./ProductService";

export default class ProductServiceHttp implements ProductService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {
        
    }
    async delete(id: string): Promise<any> {
        const response = await this.httpClient.delete(`${this.baseUrl}/products/${id}`);
        return response;
    }
    async update(id: string, description: string, price: string): Promise<any> {
        const session = await this.httpClient.put(
          `${this.baseUrl}/products/${id}`,
          {
            description,
            price
          }
        );
      return session;
    }

    async create(description: string, price: string): Promise<any> {
      const session = await this.httpClient.post(`${this.baseUrl}/products`, {
        description,
        price
      });
      return session;
    }

    async list(): Promise<any> {
        const response = await this.httpClient.get(`${this.baseUrl}/products`);
        return response.data;
    }

}
