<template>
  <div>
    <h3>Control Panel</h3>
    <div class="select-group">
      <div class="select-field">
        <label>Start City</label>
        <Select v-model="startCity" :options="labels" option-label="label" option-value="value" placeholder="Select a City" />
      </div>
      <div class="select-field">
        <label>Goal City</label>
        <Select v-model="goalCity" :options="labels" option-label="label" option-value="value" placeholder="Select a City" />
      </div>
    </div>


    <h4>Algorithm</h4>
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

    <button @click="emit('run-search')">Run Search</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Select from 'primevue/select'

const labels = ref([])

const props = defineProps({
  cities: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['run-search'])

const startCity = defineModel('startCity')
const goalCity = defineModel('goalCity')
const algorithm = defineModel('algorithm')


watch(
  () => props.cities,
  (newCities) => {
    if (!newCities || !newCities.nodes?.length) return

    labels.value = newCities.nodes.map(n => ({
      label: n.data.label,
      value: n.data.id
    }))
  }
)

</script>

<style scoped>
.select-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}
.select-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.algorithm-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
