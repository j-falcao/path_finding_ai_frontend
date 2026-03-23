<template>
  <div>
    <h3>Control Panel</h3>
    <div class="select-group">
      <div class="select-field">
        <label>Start City</label>
        <Select
          v-model="startCity"
          :options="labels"
          option-label="label"
          option-value="value"
          placeholder="Select a City"
          :class="{ invalid: startInvalid || sameCity }"
        />
        <small v-if="startInvalid" class="error"> Please select a start city </small>
      </div>
      <div class="select-field">
        <label>Goal City</label>
        <Select
          v-model="goalCity"
          :options="labels"
          option-label="label"
          option-value="value"
          placeholder="Select a City"
          :class="{ invalid: goalInvalid || sameCity }"
        />
        <small v-if="goalInvalid" class="error"> Please select a goal city </small>
        <small v-if="sameCity" class="error"> Start and Goal must be different </small>
      </div>
    </div>

    <h4>Algorithm</h4>
    <div class="algorithm-selector">
      <label>
        <input type="radio" value="ucs" v-model="algorithm" />
        Uniform Cost
      </label>

      <label>
        <input type="radio" value="dls" v-model="algorithm" />
        Depth Limited
      </label>

      <label>
        <input type="radio" value="greedy" v-model="algorithm" />
        Greedy
      </label>

      <label>
        <input type="radio" value="astar" v-model="algorithm" />
        A*
      </label>
    </div>

    <Button @click="runSearch">Run Search</Button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Select from 'primevue/select'
import Button from 'primevue/button'

const labels = ref([])
const submitted = ref(false)

const props = defineProps({
  elements: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['run-search'])

const startCity = defineModel('startCity')
const goalCity = defineModel('goalCity')
const algorithm = defineModel('algorithm')

const startInvalid = computed(() => submitted.value && !startCity.value)
const goalInvalid = computed(() => submitted.value && !goalCity.value)
const sameCity = computed(() =>
  submitted.value &&
  startCity.value &&
  goalCity.value &&
  startCity.value === goalCity.value
)

function runSearch() {
  submitted.value = true

  if (!startCity.value || !goalCity.value || startCity.value === goalCity.value) {
    return
  }

  emit('run-search')
}

watch(
  () => props.elements,
  (newElements) => {
    if (!newElements || !newElements.elements?.length) return

    labels.value = newElements.elements.map((n) => ({
      label: n.data.label,
      value: n.data.id,
    }))
  },
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
.invalid :deep(.p-select) {
  border-color: #e53935;
}

.invalid :deep(.p-select-label) {
  color: #e53935;
}
.error {
  color: #e53935;
  font-size: 0.8rem;
}

</style>
