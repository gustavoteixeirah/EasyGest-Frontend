<script setup lang="ts">
import axios from "axios";
import { inject, onMounted, reactive, ref } from "vue";
import ListComponent from '../components/ListComponent.vue';

let data: any = reactive({});

onMounted(async () => {
    
	const response = await axios({
		url: "http://localhost:8080/services",
		method: "get"
	});
	data.services = response.data;
});
</script>   


<template>
    <ListComponent :items="data.services"></ListComponent>
</template>

<style scoped>

</style>