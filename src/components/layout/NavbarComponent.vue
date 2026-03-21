<template>
  <nav>
    <div class="pages">
      <router-link to="/">Map Search</router-link>
      <router-link to="/editor">Graph Editor</router-link>
      <router-link to="/algorithms">Algorithms</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="license">Matrícula: 12-AB-34</div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}
.pages {
  display: flex;
  gap: 1rem;
}
.license {
  font-weight: bold;
}
</style>
