<template>

<div class="layout">

  <div class="panel">
    <ControlPanel
      :cities="cities"
      v-model:startCity="startCity"
      v-model:goalCity="goalCity"
      v-model:algorithm="algorithm"
      @run-search="handleSearch"
    />
  </div>

  <div class="graph">
    <GraphView
      :cities="cities"
      :path="path"
      :startCity="startCity"
      :goalCity="goalCity"
    />
  </div>

  <div class="results">
    <SearchResults :result="result" />
  </div>

</div>

</template>

<script setup>
import { ref, onMounted } from "vue"
import { getGraph, runSearch } from "../services/api"
import ControlPanel from "../components/controls/ControlPanel.vue"
import GraphView from "../components/graph/GraphView.vue"
import SearchResults from "../components/results/SearchResults.vue"

const cities = ref({})

const startCity = ref(null)
const goalCity = ref(null)
const algorithm = ref("ucs")

const result = ref({})
const path = ref([])

onMounted(async () => {
  try {
    cities.value = await getGraph()
  } catch (err) {
    console.error(err)
  }
})

async function handleSearch() {
  console.log(startCity.value, goalCity.value, algorithm.value)
  try {
    const response = await runSearch({
      start: startCity.value,
      goal: goalCity.value,
      algorithm: algorithm.value
    })
    result.value = response
    path.value = response.path
  } catch (err) {
    console.error(err)
  }
}
</script>


<style scoped>

.layout {
  display: flex;
  height: 100vh;
  gap: 20px;
  padding: 20px;
}

.panel {
  flex: 1;
}

.graph {
  flex: 4;
}

.results {
  flex: 1;
}

</style>
