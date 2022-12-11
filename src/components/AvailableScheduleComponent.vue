<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";

const authStore = useAuthStore();

const selectecServicesIds = ref([""])

async function getServicesIds() {
    const servicesIds = await authStore.getSelectecServicesIds();
    const servicesIdsArray = servicesIds.split(",");
    selectecServicesIds.value = servicesIdsArray;
    console.log(selectecServicesIds.value)
}

</script>


<template>
    <div class="main">
        Horários disponíveis
        <button @click="getServicesIds">CLICK ME BABY</button>
    </div>
</template>


<style scoped>

</style>