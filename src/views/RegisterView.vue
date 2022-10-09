<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";


const fullName = ref ("")
const email = ref ("")
const password = ref ("")

const authStore = useAuthStore();

</script>



<template>
    <div class="main">
        <h3>Preencha os campos a seguir para realizar o seu cadastro</h3>
        <div class="loginBox">
            <input type="text" v-model="fullName" placeholder="nome completo" />
            <input type="text" v-model="email" placeholder="e-mail" />
            <input type="password" v-model="password" placeholder="senha" />
                <button @click="authStore.register(fullName, email, password)">Realizar cadastro</button>
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

.loginBox {
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