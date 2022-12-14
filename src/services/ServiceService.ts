export default interface ServiceService {
  delete(id: string): Promise<any>;

  create(name: string, price: string, durationInMinutes: number): Promise<any>;

  update(id: string, name: string, price: string, durationInMinutes: number): Promise<any>;

  list(): Promise<any>;

}