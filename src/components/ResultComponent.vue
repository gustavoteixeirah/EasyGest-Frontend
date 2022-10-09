<script setup lang="ts">
import checkmark from "../assets/checkmark.png"
defineProps(["result"])

</script>

<template>

    <div class="main">
        <h3>{{result.message}}</h3>
        <img :src="checkmark" />
        <p>Utilize seu email e senha para realizar o login.</p>
        <RouterLink to="/login">

        <div class="btn">
                Clique aqui para voltar para a página de login
        </div>
    </RouterLink>

    </div>

</template>

<style scoped>
.main{
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    margin-bottom: 20px;
    height: 50vh;
}
.btn {
    height: 28px;
    width: 420px;
    color: wheat;
    text-decoration: none;
    background-color: blue;
}
img {
    height: 120px;
}
</style>
