<template>

<div class="layout">

  <div class="panel">
    <ControlPanel
      :elements="cy_elements"
      v-model:startCity="startCity"
      v-model:goalCity="goalCity"
      v-model:algorithm="algorithm"
      @run-search="handleSearch"
    />
    <SearchResults :result="result" />
  </div>

  <div class="graph">
    <GraphView
      :elements="cy_elements"
      :path="path"
      :startCity="startCity"
      :goalCity="goalCity"
    />
  </div>

</div>

</template>

<script setup>
import { ref, onMounted } from "vue"
import { getGraph, runSearch } from "../services/api"
import ControlPanel from "../components/controls/ControlPanel.vue"
import GraphView from "../components/graph/GraphView.vue"
import SearchResults from "../components/results/SearchResults.vue"

const cy_elements = ref({})

const startCity = ref(null)
const goalCity = ref(null)
const algorithm = ref("ucs")

const result = ref({})
const path = ref([])

onMounted(async () => {
  try {
    cy_elements.value = await getGraph()
  } catch (err) {
    console.error(err)
  }
})

async function handleSearch() {
  try {
    const response = await runSearch({
      map_json: cy_elements.value,
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
  gap: 20px;
  height: calc(100vh - 60px);
  overflow: hidden;
}

.panel {
  flex: 1;
  padding: 0 20px;
  border-right: 1px solid #ccc;
}

.graph {
  flex: 4;
}

</style>
