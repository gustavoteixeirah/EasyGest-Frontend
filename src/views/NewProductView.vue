<script setup lang="ts">
import axios from "axios";
import { inject, onMounted, reactive, ref } from "vue";
import ProductService from "../services/ProductService";
import { useAuthStore } from "../stores/AuthStore";

let data: any = reactive({});

const toast: any = inject('toast');
const description = ref ("")
const price = ref("")
const selectedValue = ref ("")

const productService = inject("productService") as ProductService;


const authStore = useAuthStore();
onMounted(async () => {
    await loadProducts();
});


async function loadProducts () {
    const response =  await productService.list();
	data.products = response;
    data.products.push({description: "Novo produto", price: "0"})
}

function selectedOptionChanged () {
      // @ts-ignore
    description.value = data.products.find(product  => product.id === selectedValue.value).description
      // @ts-ignore
    price.value = data.products.find(product  => product.id === selectedValue.value).price
}


async function deletarProduto () {
         const response =  await productService.delete(selectedValue.value)
         response.status === 200
            ? toast.success('Produto excluído com sucesso!')
            : toast.error('Erro ao excluir o produto!');
      // @ts-ignore
      description.value = ""
      // @ts-ignore
    price.value = ""
    selectedValue.value = undefined
    await loadProducts();
}
async function salvar () {
    if(selectedValue.value) {
         const response =  await productService.update(selectedValue.value, description.value, price.value)
         response.status === 200
            ? toast.success('Produto atualizado com sucesso!')
            : toast.error('Erro ao atualizar produto!');
    } else {
        const response = await productService.create(description.value, price.value);
         response.status === 201
            ? toast.success('Produto criado com sucesso!')
            : toast.error('Erro ao criar o produto!');
    }
    await loadProducts();
}
</script>



<template>
    <div class="main">
        <h3>Selecione um produto existente para editar,
             ou preencha os campos para criar um novo.</h3>
        <div>
         <select v-model="selectedValue"  @change="selectedOptionChanged">
				<option v-for="product in data.products" 
                v-bind:key="product.id" 
                v-bind:value="product.id">{{ product.description }}</option>
			</select>
        </div>
        <div class="box">
            <input type="text" v-model="description" placeholder="descrição" />
            <input type="text" v-model="price" placeholder="preço" />
                <button @click="salvar">Salvar</button>
                <button class="deleteBtn" @click="deletarProduto">Excluir</button>

        </div>
    </div>
</template>

<style scoped>
.deleteBtn {
    background-color: brown;
}
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