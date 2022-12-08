export default interface ProductService {

  create(description: string, price: string): Promise<any>;

  update(id: string, description: string, price: string): Promise<any>;

  list(): Promise<any>;

}