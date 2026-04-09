<template>
  <div class="layout">
    <div class="panel">
      <h3>New Node</h3>
      <div class="input-group">
        <InputText v-model="newNode" placeholder="New Node Name" />
        <Button @click="addNode">Add Node</Button>
      </div>

      <h3>New Edge</h3>
      <div class="select-group">
        <Select
          v-model="edgeSource"
          :options="nodes"
          placeholder="Source City"
          :class="{ invalid: startInvalid || sameCity }"
        />
        <small v-if="startInvalid" class="error"> Please select a start city </small>
        <Select
          v-model="edgeTarget"
          :options="nodes"
          placeholder="Target City"
          :class="{ invalid: goalInvalid || sameCity }"
        />
        <small v-if="goalInvalid" class="error"> Please select a goal city </small>
        <small v-if="sameCity" class="error"> Start and Goal must be different </small>
      </div>

      <div class="weight-group">
        <InputNumber v-model="edgeWeight" :class="{invalid: weightInvalid}" inputId="minmax-buttons" mode="decimal" showButtons :min="1" fluid />
        <Button @click="addEdge">Add Edge</Button>
      </div>

      <Button @click="downloadJSON">Download JSON</Button>
    </div>

    <div class="graph">
      <GraphView :elements="cy_elements" :path="[]" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GraphView from '../components/graph/GraphView.vue'
import Select from 'primevue/select'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

const nodes = ref([])
const edges = ref([])

const newNode = ref('')
const edgeSource = ref('')
const edgeTarget = ref('')
const edgeWeight = ref(1)

// Build Cytoscape format
const cy_elements = computed(() => ({
  elements: [
    ...nodes.value.map((n) => ({
      data: { id: n, label: n },
    })),
    ...edges.value.map((e) => ({
      data: {
        source: e.source,
        target: e.target,
        weight: e.weight,
      },
    })),
  ],
}))

function addNode() {
  const name = newNode.value.trim()

  if (!name) return
  if (nodes.value.includes(name)) {
    alert('Node already exists')
    return
  }

  nodes.value.push(name)
  newNode.value = ''
}

function addEdge() {
  if (!edgeSource.value || !edgeTarget.value) return

  const exists = edges.value.some(
    (e) => e.source === edgeSource.value && e.target === edgeTarget.value,
  )

  if (exists) {
    alert('Edge already exists')
    return
  }

  if (edgeSource.value === edgeTarget.value) {
    alert('Source and target cannot be the same')
    return
  }

  edges.value.push({
    source: edgeSource.value,
    target: edgeTarget.value,
    weight: edgeWeight.value || 1,
  })
}

function downloadJSON() {
  const dataStr = JSON.stringify(cy_elements.value, null, 2)

  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'graph.json'
  a.click()

  URL.revokeObjectURL(url)
}
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

.layout {
  display: flex;
  height: calc(100vh - 60px);
}

.panel {
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.weight-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.graph {
  flex: 3;
}
</style>
