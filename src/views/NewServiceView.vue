<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import ServiceService from "../services/ServiceService";
import { useAuthStore } from "../stores/AuthStore";


const name = ref ("")
const price = ref ("")
const duration = ref ("")

const authStore = useAuthStore();

let services: { services: undefined } = reactive({ services: undefined });

onMounted(async () => {
	const serviceService = inject("serviceService") as ServiceService;
    services = await serviceService.list();
});
</script>



<template>
    <div class="main">
        {{services}}
        <h3>Selecione um serviço existente para editar,
             ou preencha os campos para criar um novo.</h3>
        <div class="box">
            combobox
            <input type="text" v-model="name" placeholder="nome" />
            <input type="text" v-model="price" placeholder="preço" />
            <input type="number" v-model="duration" placeholder="duração" />
                <button @click="authStore.createService(name, price, duration)">Salvar</button>
        </div>
    </div>
</template>

<style scoped>
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