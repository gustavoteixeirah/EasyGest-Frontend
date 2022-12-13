<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import ScheduleService from "../services/ScheduleService";
import { useAuthStore } from "../stores/AuthStore";
import Modal from './Modal.vue';

const scheduleService = inject("scheduleService") as ScheduleService;

const authStore = useAuthStore();
let data: any = reactive({});

const isModalVisible = ref(false);
const scheduleServicesDescription = ref([""]);

onMounted(async () => {
    await load();
});

async function verServicos() {
    // await authStore.goToServicesScreen();
}
async function load() {
    const response = await scheduleService.list();

    data.schedules = response.data;
}

function formatDate(dateInput: string) {
    const date = new Date(dateInput);

    const weekday = ['Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'][date.getDay()];

    return weekday + ", " + String(date.getDate())
        + "/" + String(date.getMonth()) + "/" + String(date.getFullYear())
        + " " + String(date.getHours()) + ":00";
}
function formatPrice(priceInput: string) {
    return priceInput.replace(".", ",")
}

function closeModal() {
    isModalVisible.value = false;
}
function showModal(servicesDescription: string[]) {
    isModalVisible.value = true;
    scheduleServicesDescription.value = servicesDescription;
}
</script>


<template>
    <div class="main">
        <table class="table table-bordered">
            <tbody>
                <tr v-for="schedule in data.schedules" :key="schedule.id">
                    <div class="linhas">
                        <div>

                            <td>{{ formatDate(schedule.dateTime) }}</td>
                            <td>R$ {{ formatPrice(schedule.price) }}</td>
                        </div>
                        <div>
                            <button @click="showModal(schedule.servicesDescription)">Ver serviços</button>
                        </div>
                    </div>
                </tr>
            </tbody>
        </table>
        <Modal :services="scheduleServicesDescription" v-show="isModalVisible" @close="closeModal" />

    </div>
</template>

<style scoped>
.main {
    padding: 20px;
}

.linhas {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    font-size: 18px;
    height: 24px;
    width: 130px;
    color: whitesmoke;
    background-color: blue;
    border: 0px;
}

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