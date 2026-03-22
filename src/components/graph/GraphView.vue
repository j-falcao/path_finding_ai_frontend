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
  },
  startCity: {
    type: String,
    default: null
  },
  goalCity: {
    type: String,
    default: null
  }
})

const cyContainer = ref(null)
let cy = null

watch(
  () => props.cities,
  (newCities) => {
    if (!newCities || !newCities.nodes?.length) return

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
            "text-halign": "center",
            "background-color": "#aaa",
            "color": "#222",
            "font-weight": "bold"
          }
        },
        {
          selector: "node.start",
          style: {
            "background-color": "#22c55e"  // green
          }
        },
        {
          selector: "node.goal",
          style: {
            "background-color": "#ef4444"  // red
          }
        },
        {
          selector: "node.on-path",
          style: {
            "background-color": "#f59e0b"  // amber
          }
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#999",
            "target-arrow-color": "#999",
            "target-arrow-shape": "triangle",
            label: "data(weight)",
            "curve-style": "bezier"
          }
        },
        {
          selector: "edge.on-path",
          style: {
            "line-color": "#f59e0b",       // amber
            "target-arrow-color": "#f59e0b",
            width: 4
          }
        }
      ],
      layout: { name: "grid" }
    })

    // Apply any already-selected cities after rebuild
    applySelectionStyles()
    applyPathStyles()
  },
  { immediate: true, flush: "post" }
)

// Highlight start/goal nodes when dropdowns change
watch(
  () => [props.startCity, props.goalCity],
  () => {
    if (!cy) return
    applySelectionStyles()
  }
)

// Highlight path edges and nodes after search
watch(
  () => props.path,
  () => {
    if (!cy) return
    applyPathStyles()
  }
)

function applySelectionStyles() {
  // Clear previous selection classes (but keep on-path)
  cy.nodes().removeClass("start goal")

  if (props.startCity) {
    cy.getElementById(props.startCity).addClass("start")
  }
  if (props.goalCity) {
    cy.getElementById(props.goalCity).addClass("goal")
  }
}

function applyPathStyles() {
  // Clear previous path highlighting
  cy.nodes().removeClass("on-path")
  cy.edges().removeClass("on-path")

  const path = props.path
  if (!path || path.length < 2) return

  // Highlight path nodes (excluding start/goal so their colors take priority)
  path.forEach(nodeId => {
    cy.getElementById(nodeId).addClass("on-path")
  })

  // Highlight edges along the path
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i]
    const to = path[i + 1]
    cy.edges(`[source="${from}"][target="${to}"]`).addClass("on-path")
  }
}
</script>

<style scoped>
.graph {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
