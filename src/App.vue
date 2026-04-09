<template>
  <Toast />
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from "./components/layout/NavbarComponent.vue"
import Toast from "primevue/toast"
</script>
