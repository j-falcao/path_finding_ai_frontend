<template>
  <div ref="cyContainer" style="width: 100%; height: 500px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cytoscape from 'cytoscape'

const cyContainer = ref(null)

onMounted(() => {
  cytoscape({
    container: cyContainer.value,

    elements: [
      { data: { id: 'Lisboa' } },
      { data: { id: 'Porto' } },
      { data: { id: 'Coimbra' } },
      { data: { id: 'Agata' } },

      { data: { id: 'l-p', source: 'Lisboa', target: 'Porto', } },
      { data: { id: 'p-c', source: 'Porto', target: 'Coimbra' } }
    ],

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#0074D9',
          'label': 'data(id)',
          'color': '#fff',
          'text-valign': 'center'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': '#ccc',
          'label': 'data(id)',
          'font-size': '12px',
          'color': '#999'
        }
      }
    ],

    layout: {
      name: 'cose'
    }
  })
})
</script>
