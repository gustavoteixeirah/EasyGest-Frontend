import { defineStore } from "pinia";
import ServiceEntity from "../entities/ServiceEntity";

export const useAuthStore = defineStore("authStore", {
  state() {
    return {
      session: {} as any,
    };
  },
  actions: {
    async getSelectecServicesIds() {
      return localStorage.getItem("selectecServicesIds");
    },
    async agendarSelecionarHorario(selectecServicesIds: string) {
      localStorage.setItem("selectecServicesIds", selectecServicesIds);
      // @ts-ignore
      this.$router.push("/available-schedule");
    },
    async login(username: string, password: string) {
      // @ts-ignore
      this.session = await this.authService.login(username, password);
      localStorage.setItem("token", this.session.access_token);
      // @ts-ignore
      this.$router.push("/dashboard");
    },
    isLoggedIn() {
      const token = localStorage.getItem("token");
      if (token) {
        return true;
      } else {
        return false;
      }
    },
    logout() {
      this.session = {};
      localStorage.removeItem("token");
      // @ts-ignore
      this.$router.push("/login");
    },
    init() {
      const token = localStorage.getItem("token");
      if (token) {
        this.session.token = token;
      }
    },
    async register(
      fullName: string,
      email: string,
      password: string
    ): Promise<any> {
      let username = email;

      // @ts-ignore
      const session = await this.userService.register(
        fullName,
        username,
        email,
        password
      );
      // @ts-ignore
      this.$router.push("/result");
      return session;
    },
    async createService(
      name: string,
      price: string,
      durationInMinutes: number
    ): Promise<any> {
      // @ts-ignore
      const session = await this.serviceService.create(
        name,
        price,
        durationInMinutes
      );
      // @ts-ignore
      this.$router.push("/result");
      return session;
    },
    async listServices(): Promise<any> {
      // @ts-ignore
      const data = await this.serviceService.list();
      const services = [];
      for (const service of data) {
        const serviceObj = new ServiceEntity(
          service.id,
          service.description,
          service.price,
          service.durationInMinutes
        );
        // @ts-ignore
        services.push(serviceObj);
      }
      console.log("Listing services inside authStore: ", services);
      return services;
    },
  },
});
