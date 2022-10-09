export default interface UserService {

  register(fullName: string, username: string, email: string, password: string): Promise<any>;

}