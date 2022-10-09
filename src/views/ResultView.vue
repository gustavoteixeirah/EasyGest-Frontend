<script setup lang="ts">
import ResultComponent from '../components/ResultComponent.vue';


const result = {
    message: "Cadastro realizado com sucesso!"
}
</script>   



<template>
    <ResultComponent :result="result" ></ResultComponent>
</template>

<style scoped>

</style>