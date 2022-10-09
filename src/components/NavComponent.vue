<script setup lang="ts">
import { useAuthStore } from "../stores/AuthStore";
import Button from "./Button.vue";

const authStore = useAuthStore();
const button = {
    text: "Login"
}
</script>


<template>
    <div class="nav">
        <!-- {{ authStore.session.token }} -->
        <RouterLink class="no-decoration" to="/">
            <div class="appName">
           EasyGest
        </div>
    </RouterLink>
        <div>
            <b-button 
            variant="outline-primary" 
            @click="authStore.logout" 
            v-if="authStore.isLoggedIn()">
            Logout
        </b-button>
            <RouterLink class="no-decoration" to="/login" v-if="!authStore.isLoggedIn()">
                <Button :button="button"></Button>
            </RouterLink>
        </div>

    </div>
</template>

<style scoped>
.nav {
    /* background-color: cyan; */
    display: flex;
    justify-content: space-between;
    text-align: right;
    align-items: center;
    padding:  20px 20px 20px 20px;
    background-color: #1F51FF;
    color: white;
    margin: -20px -20px 0px -20px;
}
.appName {
    padding-top: 5px;
    font-size: 21px;
    font-weight: 700;
    color: white;
}
.no-decoration {
    text-decoration: none!important;
}
/* CSS */
.button-6 {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>