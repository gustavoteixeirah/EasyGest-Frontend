export default interface ServiceService {

  create(name: string, price: string, duration: string): Promise<any>;

}