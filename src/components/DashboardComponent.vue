<script setup lang="ts">

// defineProps(["board"]);

</script>

<template>
    <div class="dash">
        <div class="wrapper">
            <RouterLink to="/new-service" class="no-decoration">
                <div class="box">
                    Criar e Editar Serviços
                </div>
            </RouterLink>
        </div>
        <div class="wrapper">
            <RouterLink to="/new-product" class="no-decoration">
                <div class="box">
                    Criar e Editar Produtos
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
}

.box {
    background-color: rgb(55, 55, 110);
    color: white;
    padding: 20px;
    border-radius: .5em;
    margin: 1%;
}

body {
    font: 1.4em/1.3 "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
    margin: 2em 3em;
}
</style>
