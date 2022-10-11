export default interface ServiceService {

  create(name: string, price: string, durationInMinutes: number): Promise<any>;

  update(id: string, name: string, price: string, durationInMinutes: number): Promise<any>;

  list(): Promise<any>;

}