<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import ServiceService from "../services/ServiceService";
import { useAuthStore } from "../stores/AuthStore";

let data: any = reactive({});

const toast: any = inject('toast');


const authStore = useAuthStore();
onMounted(async () => {
    await loadServices();
});


async function loadServices() {
    const response = await serviceService.list();
    data.services = response;
    data.services.push({ description: "Novo serviço", price: "0", duration: 1 })
}
function selectedOptionChanged() {
    // @ts-ignore
    name.value = data.services.find(service => service.id === selectedValue.value).description

    // @ts-ignore
    price.value = data.services.find(service => service.id === selectedValue.value).price

    // @ts-ignore
    duration.value = data.services.find(service => service.id === selectedValue.value).durationInMinutes
}

const name = ref("")
const price = ref("")
const duration = ref(0)
const selectedValue = ref("")

const serviceService = inject("serviceService") as ServiceService;

async function deleteService() {
    const response = await serviceService.delete(selectedValue.value)
    response.status === 200
        ? toast.success('Serviço excluído com sucesso!')
        : toast.error('Erro ao excluir o serviço!');
    // @ts-ignore
    name.value = ""
    // @ts-ignore
    price.value = ""
    // @ts-ignore
    duration.value = 0
    // @ts-ignore
    selectedValue.value = undefined
    await loadServices();
}
async function salvar() {
    if (selectedValue.value) {
        const response = await serviceService.update(selectedValue.value, name.value, price.value, duration.value)
        response.status === 200
            ? toast.success('Serviço atualizado com sucesso!')
            : toast.error('Erro ao atualizar serviço!')
    } else {
        const response = await serviceService.create(name.value, price.value, duration.value)
        response.status === 201
            ? toast.success('Serviço criado com sucesso!')
            : toast.error('Erro ao criar o serviço!')
    }
    await loadServices();
}
</script>



<template>
    <div class="main">
        <h3>Selecione um serviço existente para editar,
            ou preencha os campos para criar um novo.</h3>
        <div>
            <select v-model="selectedValue" @change="selectedOptionChanged">
                <option v-for="service in data.services" v-bind:key="service.id" v-bind:value="service.id">{{
                        service.description
                }}</option>
            </select>
        </div>
        <div class="box">
            <input type="text" v-model="name" placeholder="nome" />
            <input type="text" v-model="price" placeholder="preço" />
            <input type="number" v-model="duration" placeholder="duração" />
            <button @click="salvar">Salvar</button>
            <button class="deleteBtn" @click="deleteService">Excluir</button>
        </div>
    </div>
</template>

<style scoped>
.deleteBtn {
    background-color: brown;
}

input {
    background-color: lightgray;
    border: 0px;
    height: 32px;
    width: 256px;
    font-size: 24px;
}

button {
    font-size: 18px;
    font-weight: 700;
    height: 32px;
    width: 180px;
    color: whitesmoke;
    background-color: blue;
    border: 0px;
}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.box {
    width: 256px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.cadastrar {
    margin-top: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>