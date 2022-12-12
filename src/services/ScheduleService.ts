export default interface ScheduleService {

  create(customerId: string, dateTime: string, servicesId: Array<string>): Promise<any>;

}