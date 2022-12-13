<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import ScheduleService from "../services/ScheduleService";
import { useAuthStore } from "../stores/AuthStore";


const scheduleService = inject("scheduleService") as ScheduleService;

const toast: any = inject('toast');

const authStore = useAuthStore();

const selectedServicesIds = ref([""])
const selectedTime = ref({})
const selectedTimeToDisplay = ref("")

const horarios = ["08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
const SEGUNDA = "Segunda-feira"
const TERCA = "Terça-feira"
const QUARTA = "Quarta-feira"
const QUINTA = "Quinta-feira"
const SEXTA = "Sexta-feira"

async function getServicesIds() {
    const servicesIds = await authStore.getSelectecServicesIds();
    // @ts-ignore
    const servicesIdsArray = servicesIds.split(",");
    selectedServicesIds.value = servicesIdsArray;
}
// async function agendarHorario() {
//     // @ts-ignore
//     const selectedTime = String(selectedTime.value)
// }

function getDay(weekday: number) {
    const monday = new Date();
    monday.setDate(monday.getDate() + (1 + 7 - monday.getDay()) % 7);
    const result = addDays(monday, weekday)
    return result.getDate();
}

function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


async function changeSelectedTime(horario: string, diaDaSemana: number) {

    let hour = horario.replace(":00", "")
    hour = hour.substring(0, 1) === "0" ? hour.replace("0", "") : hour;
    const dateTime = new Date();
    dateTime.setHours(parseInt(hour))
    dateTime.setMinutes(0)
    dateTime.setSeconds(0);
    dateTime.setDate(getDay(diaDaSemana));
    selectedTime.value = dateTime;
    await changeSelectedTimeToDisplay(dateTime)
}
async function changeSelectedTimeToDisplay(date: Date) {
    const weekday = ['Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'][date.getDay()];

    selectedTimeToDisplay.value = weekday + ", " + String(date.getDate())
        + "/" + String(date.getMonth()) + "/" + String(date.getFullYear())
        + " " + String(date.getHours()) + ":00";
}

async function confirmarHorario() {
    await getServicesIds();

    const date = selectedTime.value
    // @ts-ignore
    var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    // @ts-ignore
    const dateTime = isoDateTime
    // const dateTime = selectedTime.value.toISOString()
    const servicesId = selectedServicesIds.value
    const customerId = await authStore.getUserId();

    if (dateTime && servicesId && customerId) {
        const response = await scheduleService.create(customerId, dateTime, servicesId)

        response.status === 201
            ? toast.success('Agendamento realizado com sucesso!')
            : toast.error('Erro ao agendar serviço!')
    } else {
        toast.error('Aconteceu algo errado, por favor tente novamente mais tarde!')
    }
    await authStore.goToSuccessScreen();
}

</script>


<template>
    <div class="main">
        Horários disponíveis

        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">{{ getDay(0) }} <br />SEGUNDA</th>
                        <th scope="col">{{ getDay(1) }} <br />TERÇA</th>
                        <th scope="col">{{ getDay(2) }} <br />QUARTA</th>
                        <th scope="col">{{ getDay(3) }} <br />QUINTA</th>
                        <th scope="col">{{ getDay(4) }} <br />SEXTA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="horario, index in horarios" :key="index">
                        <td>
                            <div class="time" v-on:click="changeSelectedTime(horario, 0)">{{ horario }}</div>
                        </td>
                        <td>
                            <div class="time" v-on:click="changeSelectedTime(horario, 1)">{{ horario }}</div>
                        </td>
                        <td>
                            <div class="time" v-on:click="changeSelectedTime(horario, 2)">{{ horario }}</div>
                        </td>
                        <td>
                            <div class="time" v-on:click="changeSelectedTime(horario, 3)">{{ horario }}</div>
                        </td>
                        <td>
                            <div class="time" v-on:click="changeSelectedTime(horario, 4)">{{ horario }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="sumario">
            <div>
                Horário selecionado: {{ selectedTimeToDisplay }}
            </div>
            <div>
                <button @click="confirmarHorario">Confirmar horário</button>
            </div>
        </div>
    </div>

</template>


<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

table {
    text-align: center;
    width: 100%;
    border-collapse: collapse;
}

td,
th {
    text-align: center;
    border: none;
    padding: 5px;
    margin: 2px;
}

.time {
    width: 60px;
    background-color: blue;
    padding: 5px;
    color: white;
}

button {
    font-size: 18px;
    height: 32px;
    width: 180px;
    color: whitesmoke;
    background-color: blue;
    border: 0px;
}

.sumario {
    padding-top: 50px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>