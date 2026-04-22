<template>
  <nav>
    <div class="pages">
      <router-link to="/">Map Search</router-link>
      <router-link to="/editor">Graph Editor</router-link>
    </div>

    <LicensePlate />
  </nav>
</template>

<script setup>
import LicensePlate from '../ocr/LicensePlate.vue'
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #ccc;
  height: 60px;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.pages {
  display: flex;
  gap: 1rem;
}

/* Default link style */
.pages a {
  color: black;
  text-decoration: none;
}

/* Prevent visited links from changing color */
.pages a:visited {
  color: black;
}

/* Active (selected) route */
.pages a.router-link-active {
  text-decoration: underline;
  text-decoration-color: black;
}

/* hover effect */
.pages a:hover {
  text-decoration: underline;
}
</style>
