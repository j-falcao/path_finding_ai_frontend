<template>
  <div ref="cyContainer" class="graph"></div>
</template>
<script setup>
import { ref, watch } from "vue"
import cytoscape from "cytoscape"

const props = defineProps({
  cities: {
    type: Object,
    required: true
  },
  path: {
    type: Array,
    required: true
  }
})

const cyContainer = ref(null)
let cy = null

watch(
  () => props.cities,
  (newCities) => {
    if (!newCities || !newCities.nodes?.length) return

    // destroy previous instance if it exists
    if (cy) {
      cy.destroy()
      cy = null
    }

    cy = cytoscape({
      container: cyContainer.value,
      elements: newCities,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center"
          }
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#999",
            "target-arrow-shape": "triangle",
            label: "data(weight)"
          }
        }
      ],
      layout: { name: "grid" }
    })
  },
  { immediate: true, flush: "post" }
)
</script>


<style scoped>

.graph {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}

</style>
