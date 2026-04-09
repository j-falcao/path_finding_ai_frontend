<template>
  <nav>
    <div class="pages">
      <router-link to="/">Map Search</router-link>
      <router-link to="/editor">Graph Editor</router-link>
      <router-link to="/algorithms">Algorithms</router-link>
      <router-link to="/about">About</router-link>
    </div>

    <LicenseDropdown />
  </nav>
</template>

<script setup>
import LicenseDropdown from '../ocr/LicensePlate.vue'
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #ccc;
  height: 60px;
}
.pages {
  display: flex;
  gap: 1rem;
}
.license {
  font-weight: bold;
}
</style>
