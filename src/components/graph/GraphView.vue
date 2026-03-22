<template>
  <div ref="cyContainer" class="graph"></div>
</template>

<script setup>

import { ref, onMounted } from "vue"
import cytoscape from "cytoscape"

const props = defineProps({
  cities: {
    type: Array,
    required: true
  },
  path: {
    type: Array,
    required: true
  }
})

const cyContainer = ref(null)
let cy = null

onMounted(() => {

  cy = cytoscape({
    container: cyContainer.value,

    elements: props.cities,

    style: [
      {
        selector: "node",
        style: {
          label: "data(id)",
          "text-valign": "center",
          "text-halign": "center"
        }
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "#999",
          "target-arrow-shape": "triangle"
        }
      }
    ],

    layout: {
      name: "grid"
    }
  })

})

</script>

<style scoped>

.graph {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}

</style>
