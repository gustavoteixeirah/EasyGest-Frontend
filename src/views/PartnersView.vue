<script setup lang="ts">
import axios from "axios";
import { inject, onMounted, reactive, ref } from "vue";
import UserService from "../services/UserService";
import { useAuthStore } from "../stores/AuthStore";

let data: any = reactive({});

const toast: any = inject('toast');
const description = ref("")
const price = ref("")
const selectedValue = ref("")

const fullName = ref("")
const email = ref("")
const password = ref("")
const cnpj = ref("")

const userService = inject("userService") as UserService;
const authStore = useAuthStore();

onMounted(async () => {
    await loadPartners();
});


async function loadPartners() {
    const response = await userService.listPartners();
    data.partners = response;
    data.partners.push(
        {
            fullName: "Novo parceiro",
            email: "",
            password: "",
            cnpj: ""
        }
    )
}

function selectedOptionChanged() {
    // @ts-ignore
    fullName.value = data.partners.find(product => product.id === selectedValue.value).fullName
    // @ts-ignore
    email.value = data.partners.find(product => product.id === selectedValue.value).email
    // @ts-ignore
    password.value = data.partners.find(product => product.id === selectedValue.value).password
    // @ts-ignore
    cnpj.value = data.partners.find(product => product.id === selectedValue.value).cnpj
}


async function salvar() {
    if (selectedValue.value) {
        const response = await userService.updatePartner(selectedValue.value, fullName.value, email.value, password.value, cnpj.value)
        response.status === 200
            ? toast.success('Parceiro atualizado com sucesso!')
            : toast.error('Erro ao atualizar parceiro!');
    } else {
        const response = await userService.createPartner(fullName.value, email.value, password.value, cnpj.value);
        response.status === 201
            ? toast.success('Parceiro criado com sucesso!')
            : toast.error('Erro ao criar o parceiro!');
    }
    await loadPartners();
}
</script>



<template>
    <div class="main">
        <h3>Selecione um parceiro existente para editar,
            ou preencha os campos para criar um novo.</h3>
        <div>
            <select v-model="selectedValue" @change="selectedOptionChanged">
                <option v-for="partner in data.partners" v-bind:key="partner.id" v-bind:value="partner.id">{{
                        partner.fullName
                }}</option>
            </select>
        </div>
        <div class="box">
            <input type="text" v-model="fullName" placeholder="Nome Completo" />
            <input type="text" v-model="email" placeholder="E-mail" />
            <input type="text" v-model="cnpj" placeholder="CNPJ" />
            <input type="text" v-model="password" placeholder="Senha" />
            <button @click="salvar">Salvar</button>
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