<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useAuthStore } from "../stores/AuthStore";
const authStore = useAuthStore();
const regularUser = ref(false);
const partner = ref(false);
const systemAdmin = ref(false);

onMounted(async () => {
    await load();
});

async function load() {
    const userRoles = await authStore.getUserRoles();
    if (userRoles === "REGULAR_USER") regularUser.value = true;
    if (userRoles === "PARTNER") partner.value = true;
    if (userRoles === "SYSTEM_ADMIN") systemAdmin.value = true;
}
</script>

<template>
    <div class="dash">
        <div v-if="partner" class="wrapper">
            <RouterLink to="/new-service" class="no-decoration">
                <div class="box">
                    Criar e Editar Serviços
                </div>
            </RouterLink>
        </div>
        <div v-if="partner" class="wrapper">
            <RouterLink to="/new-product" class="no-decoration">
                <div class="box">
                    Criar e Editar Produtos
                </div>
            </RouterLink>
        </div>
        <div v-if="regularUser" class="wrapper">
            <RouterLink to="/available-services" class="no-decoration">
                <div class="box">
                    Agendar um serviço
                </div>
            </RouterLink>
        </div>
        <div v-if="regularUser" class="wrapper">
            <RouterLink to="/history" class="no-decoration">
                <div class="box">
                    Histórico
                </div>
            </RouterLink>
        </div>
        <div v-if="systemAdmin" class="wrapper">
            <RouterLink to="/users" class="no-decoration">
                <div class="box">
                    Gerenciamento de Usuários
                </div>
            </RouterLink>
        </div>
        <div v-if="systemAdmin" class="wrapper">
            <RouterLink to="/partners" class="no-decoration">
                <div class="box">
                    Gerenciamento de Parceiros
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.dash {
    display: flex;
}

.no-decoration {
    text-decoration: none;
}

* {
    box-sizing: border-box;
}

.wrapper {
    /* border: 5px dotted black; */
    width: 150px;
    height: 100px;
    background-color: rgb(55, 55, 110);
    border-radius: .5em;
    padding: 20px;
    margin: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.box {
    color: white;
    /* padding: 20px;
    margin: 1%; */
}

body {
    font: 1.4em/1.3 "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
    margin: 2em 3em;
}
</style>
