<template>

<div class="algorithm-selector">

<label>
<input type="radio" value="ucs" v-model="algorithm">
Uniform Cost
</label>

<label>
<input type="radio" value="dls" v-model="algorithm">
Depth Limited
</label>

<label>
<input type="radio" value="greedy" v-model="algorithm">
Greedy
</label>

<label>
<input type="radio" value="astar" v-model="algorithm">
A*
</label>

</div>

</template>

<script setup>

const algorithm = defineModel()

</script>

<style scoped>
.algorithm-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
