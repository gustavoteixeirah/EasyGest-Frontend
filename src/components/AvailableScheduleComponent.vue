<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";

const authStore = useAuthStore();

const selectecServicesIds = ref([""])
const selectedTime = ref("")
const horarios = ["08:00", "09:00", "10:00", "11:00", "12:00"]
const SEGUNDA = "Segunda-feira"
const TERCA = "Terça-feira"
const QUARTA = "Quarta-feira"
const QUINTA = "Quinta-feira"
const SEXTA = "Sexta-feira"

async function getServicesIds() {
    const servicesIds = await authStore.getSelectecServicesIds();
    // @ts-ignore
    const servicesIdsArray = servicesIds.split(",");
    selectecServicesIds.value = servicesIdsArray;
}
async function agendarHorario() {
    const selectedTime = String(selectedTime.value)
    console.log("selectedTime: ", selectedTime)

} async function changeSelectedTime(horario: string, diaDaSemana: string) {
    console.log("horario e diaDaSemana: ", horario, "-", diaDaSemana)
}
</script>


<template>
    <div class="main">
        Horários disponíveis
        <button @click="getServicesIds">CLICK ME BABY</button>

        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">SEGUNDA</th>
                        <th scope="col">TERÇA</th>
                        <th scope="col">QUARTA</th>
                        <th scope="col">QUINTA</th>
                        <th scope="col">SEXTA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="horario, index in horarios" :key="index">
                        <td><div class="time" v-on:click="changeSelectedTime(horario, SEGUNDA)">{{ horario }}</div></td>
                        <td><div class="time" v-on:click="changeSelectedTime(horario, TERCA)">{{ horario }}</div></td>
                        <td><div class="time" v-on:click="changeSelectedTime(horario, QUARTA)">{{ horario }}</div></td>
                        <td><div class="time" v-on:click="changeSelectedTime(horario, QUINTA)">{{ horario }}</div></td>
                        <td><div class="time" v-on:click="changeSelectedTime(horario, SEXTA)">{{ horario }}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="sumario">
            <div>
                Horário selecionado: {{ selectedTime }}
            </div>
            <div>
                <div class="box">
                    Confirma horário
                </div>
                <button @click="confirmarHorario">Agendar Horário</button>
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
</style>