export default interface UserService {
  updatePartner(
    id: string,
    fullName: string,
    email: string,
    password: string,
    cnpj: string
  ): Promise<any>;
  createPartner(
    fullName: string,
    email: string,
    password: string,
    cnpj: string
  ): Promise<any>;

  register(
    fullName: string,
    username: string,
    email: string,
    password: string
  ): Promise<any>;

  listPartners(): Promise<any>;
}
