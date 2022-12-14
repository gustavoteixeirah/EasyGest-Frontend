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
    await loadUsers();
});


async function loadUsers() {
    const response = await userService.listUsers();
    data.users = response;
    data.users.push(
        {
            id: "",
            fullName: "",
            email: "",
            password: "",
        }
    )
}

</script>



<template>
        
        <div>
        <table class="table table-bordered">
            <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
        </tr>
      </thead>
            <tbody>
                <tr v-for="user in data.users" :key="user.id">
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
        <!-- <div class="box">
            <input type="text" v-model="fullName" placeholder="Nome" />
            <input type="text" v-model="email" placeholder="E-mail" />
            <input type="text" v-model="cnpj" placeholder="CNPJ" />
            <input type="text" v-model="password" placeholder="Senha" />
            <button @click="salvar">Salvar</button>
            <button class="deleteBtn" @click="deletePartner">Excluir</button>
        </div> -->
</template>

<style scoped>
input {
    background-color: lightgray;
    border: 0px;
    height: 32px;
    width: 256px;
    font-size: 24px;
}
.deleteBtn {
    background-color: brown;
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