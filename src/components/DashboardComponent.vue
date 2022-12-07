<script setup lang="ts">

// defineProps(["board"]);

</script>

<template>
  
  <RouterLink to="/new-service" class="no-decoration">
    <div class="rectangle">
      <span>Criar e Editar Serviços</span>
    </div>
  </RouterLink>
</template>

<style scoped>

.rectangle {
    display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
  width: 150px;
  background-color: #1F51FF;
  color: white;
  margin: 20px;
}
.no-decoration {
    text-decoration: none;
}

</style>
