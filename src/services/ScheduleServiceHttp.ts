import HttpClient from "../infra/http/HttpClient";
import ScheduleService from "./ScheduleService";

export default class ScheduleServiceHttp implements ScheduleService {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async create(
    customerId: string,
    dateTime: string,
    servicesId: string[]
  ): Promise<any> {
    const session = await this.httpClient.post(`${this.baseUrl}/schedulings`, {
      customerId,
      dateTime,
      servicesId,
    });
    console.log({
        customerId,
        dateTime,
        servicesId,
      })
    return session;
  }
}
