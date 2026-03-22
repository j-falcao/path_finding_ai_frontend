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
    <GraphView :cities="cities" :path="path" />
  </div>

  <div class="results">
    <SearchResults :result="result" />
  </div>

</div>

</template>

<script setup>

import { ref } from "vue"
import { runSearch } from "../services/searchService"
import ControlPanel from "../components/controls/ControlPanel.vue"
import GraphView from "../components/graph/GraphView.vue"
import SearchResults from "../components/results/SearchResults.vue"

const cities = [
  { data: { id: "Lisboa" } },
  { data: { id: "Porto" } },
  { data: { source: "Lisboa", target: "Porto", weight: 300 } }
]

const startCity = ref(null)
const goalCity = ref(null)
const algorithm = ref("ucs")

const result = ref({})
const path = ref([])

async function handleSearch() {

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
  flex: 5;
}

.results {
  flex: 1;
}

</style>
