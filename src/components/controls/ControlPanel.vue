<template>
  <div style="padding-top: 20px;">
    <FileUpload
      mode="basic"
      accept=".json,application/json"
      :auto="false"
      customUpload
      @select="handleFileUpload"
      chooseLabel="Upload JSON"
    />
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

      <div class="dls-selector">
        <label>
          <input type="radio" value="dls" v-model="algorithm" />
          Depth Limited
        </label>
        <InputNumber
          v-model="depth"
          class="depth-input"
          :class="{ invalid: depthInvalid }"
          :disabled="algorithm != 'dls'"
          inputId="minmax-buttons"
          mode="decimal"
          showButtons
          :min="1"
          fluid
        />
      </div>
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
import InputNumber from 'primevue/inputnumber'
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const labels = ref([])
const submitted = ref(false)

const props = defineProps({
  elements: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['run-search', 'load-graph'])

const startCity = defineModel('startCity')
const goalCity = defineModel('goalCity')
const algorithm = defineModel('algorithm')
const depth = defineModel('depth')

const depthInvalid = computed(() => submitted.value && algorithm.value === 'dls' && !depth.value)
const startInvalid = computed(() => submitted.value && !startCity.value)
const goalInvalid = computed(() => submitted.value && !goalCity.value)
const sameCity = computed(
  () => submitted.value && startCity.value && goalCity.value && startCity.value === goalCity.value,
)

function runSearch() {
  submitted.value = true

  if (
    !startCity.value ||
    !goalCity.value ||
    startCity.value === goalCity.value ||
    (algorithm.value === 'dls' && !depth.value)
  ) {
    return
  }

  emit('run-search')
}

function handleFileUpload(event) {
  const file = event.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result)

      if (!json.elements || !Array.isArray(json.elements)) {
        throw new Error('Invalid format')
      }

      // send to parent
      emit('load-graph', json)
    } catch (err) {
      console.error(err)
    }
  }

  reader.readAsText(file)

  toast.add({
  severity: 'success',
  summary: 'Graph Loaded',
  detail: 'You can now run searches',
  life: 3000,
})

}

watch(
  () => props.elements,
  (newElements) => {
    if (!newElements || !newElements.elements?.length) return

    labels.value = newElements.elements
      .filter((el) => el.data?.id && !el.data.source)
      .map((n) => ({
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
.dls-selector {
  display: flex;
  align-items: center;
}
.depth-input {
  width: 120px;
  margin-left: 1rem;
}
.invalid :deep(.p-inputnumber-input) {
  border-color: #e53935;
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
