<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import ServiceService from "../services/ServiceService";

const serviceService = inject("serviceService") as ServiceService;

let data: any = reactive({});
onMounted(async () => {
    await loadServices();
});

async function loadServices() {
    const response = await serviceService.list();
    data.services = response;
}

const selectedServices = ref([])
const selectedServicesTotalPrice = ref("")

async function selectedServicesChanged() {
    let price = 0;
    for (let serviceId of selectedServices.value) {
        const priceFound = parseFloat(data.services.find(service  => service.id === serviceId).price);
        price += priceFound
    }
    selectedServicesTotalPrice.value = price.toFixed(2);

}

async function agendarHorario () {
  console.log(selectedServices.value)
}
</script>


<template>
    <div class="main">
        Serviços disponíveis
    </div>
    <div>
        <table class="table table-bordered">
            <!-- <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Descrição</th>
          <th scope="col">Preço</th>
          <th scope="col">Duração</th>
        </tr>
      </thead> -->
            <tbody>
                <tr v-for="service, index in data.services" :key="service.id">
                    <!-- <th scope="row">{{ index + 1 }}</th> -->
                    <td>{{ service.description }}</td>
                    <td>R$ {{ service.price }}</td>
                    <!-- <td>{{ service.durationInMinutes }}</td> -->
                    <input type="checkbox" 
                    :value="service.id"
                     v-model="selectedServices"
                     @change="selectedServicesChanged">
                </tr>
            </tbody>
        </table>
    </div>
    <div>
        Soma dos serviços selecionados: R$ {{selectedServicesTotalPrice}}
        <button @click="agendarHorario">Agendar Horário</button>
    </div>
</template>


<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

td,
th {
    text-align: left;
    border: none;
    padding: 5px;
    margin: 2px;
}

tr:nth-child(even) {
    background: rgb(212, 210, 210)
}

tr:nth-child(odd) {
    background: rgb(162, 171, 250)
}
</style>