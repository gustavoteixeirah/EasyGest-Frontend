<script setup lang="ts">

defineProps(["item"])

</script>


<template>
     <div>
        {{item.description}}
    </div>
</template>

<style scoped>
.no-decoration {
    text-decoration: none
}

</style>