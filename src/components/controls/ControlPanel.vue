<template>

<div>

<label>Start City</label>
<Select
  v-model="startCity"
  :options="cities"
  placeholder="Select a City"
  class="w-full md:w-56"
/>

<label>Goal City</label>
<Select
  v-model="goalCity"
  :options="cities"
  placeholder="Select a City"
  class="w-full md:w-56"
/>

<AlgorithmSelector v-model="algorithm" />

<button @click="emit('run-search')">
  Run Search
</button>

</div>

</template>

<script setup>

import Select from "primevue/select"
import AlgorithmSelector from "./AlgorithmSelector.vue"

defineProps({
  cities: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(["run-search"])

const startCity = defineModel("startCity")
const goalCity = defineModel("goalCity")
const algorithm = defineModel("algorithm")

</script>
