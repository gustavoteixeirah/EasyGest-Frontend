<script setup lang="ts">
import ListItemComponent from './ListItemComponent.vue';


defineProps(["items"])

</script>


<template>
     <div>
        <h1> List </h1>
<ul>
    <li v-bind:key="item.id" v-for="item in items">
        <ListItemComponent :item="item"></ListItemComponent>
    </li>
</ul>
    </div>
</template>

<style scoped>
.no-decoration {
    text-decoration: none
}

</style>