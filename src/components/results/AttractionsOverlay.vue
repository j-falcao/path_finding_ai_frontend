<template>
  <div v-if="visible" class="overlay">

    <!-- Header -->
    <div class="overlay-header">
      <div class="flex align-items-center gap-2">
        <i class="pi pi-map-marker text-primary" />
        <span class="font-bold text-lg">Path Attractions</span>
        <Badge :value="`${cities.length} cities`" severity="secondary" />
      </div>
      <Button icon="pi pi-times" text rounded size="small" @click="$emit('close')" />
    </div>

    <!-- Loading — fake cards that match real layout -->
    <div v-if="loading">

      <!-- Fake cards row -->
      <div class="cards-row">
        <div v-for="n in 3" :key="n" class="attraction-card p-card p-component">
          <!-- mirrors Card #header -->
          <Skeleton width="100%" height="4px" class="border-round-top" />
          <div class="p-card-body">
            <!-- mirrors Card #title -->
            <Skeleton width="70%" height="16px" class="mb-2" />
            <!-- mirrors Card #subtitle (Tag) -->
            <Skeleton width="90px" height="22px" border-radius="10px" class="mb-3" />
            <!-- mirrors Card #content -->
            <Skeleton width="100%" height="12px" class="mb-1" />
            <Skeleton width="80%" height="12px" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <Message v-else-if="error" severity="error" class="m-3">
      Could not load attractions for the path.
    </Message>

    <!-- Tabs per city -->
    <Tabs v-else v-model:value="activeTab" class="overlay-tabs">
      <TabList>
        <Tab v-for="(group, i) in attractionGroups" :key="group.city" :value="i">
          <i class="pi pi-map-marker mr-1" />
          {{ group.city }}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel v-for="(group, i) in attractionGroups" :key="group.city" :value="i">
          <div class="cards-row">
            <Card v-for="(item, j) in group.attractions" :key="j" class="attraction-card">
              <template #header>
                <div class="card-header-bar" :class="`cat-${slugify(item.category)}`" />
              </template>
              <template #title>{{ item.name }}</template>
              <template #subtitle>
                <Tag :value="`${categoryEmoji(item.category)}  ${item.category}`" :severity="categorySeverity(item.category)" />
              </template>
              <template #content>
                <p class="text-sm text-color-secondary m-0">{{ item.description }}</p>
              </template>
            </Card>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAttractions } from '../../services/api'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import Message from 'primevue/message'

const props = defineProps({
  cities: { type: Array, default: () => [] },
  visible: { type: Boolean, default: false },
})

defineEmits(['close'])

const attractionGroups = ref([])
const loading = ref(false)
const error = ref(false)
const activeTab = ref(0)

watch(
  () => [props.visible, props.cities],
  async ([vis, cities]) => {
    if (!vis || !cities?.length) return
    loading.value = true
    error.value = false
    attractionGroups.value = []
    activeTab.value = 0
    try {
      attractionGroups.value = await Promise.all(
        cities.map(async (city) => ({
          city,
          attractions: await getAttractions(city),
        }))
      )
    } catch (e) {
      console.error(e)
      error.value = true
    } finally {
      loading.value = false
    }
  },
  { immediate: true, deep: true }
)

function categoryEmoji(cat = '') {
  return { museum: '🏛️', monument: '🗿', park: '🌳' }[(cat ?? '').toLowerCase()] ?? '📌'
}

function categorySeverity(cat = '') {
  return { museum: 'info', monument: 'warn', park: 'success' }[(cat ?? '').toLowerCase()] ?? 'secondary'
}

function slugify(str = '') {
  return (str ?? '').toLowerCase().replace(/\s+/g, '-')
}
</script>

<style scoped>
.overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 100;
  background: var(--p-surface-0);
  border-top: 1px solid var(--p-surface-200);
  box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
}

.overlay-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--p-surface-200);
}

.overlay-tabs :deep(.p-tabpanels) { padding: 0; }

.cards-row {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 14px 16px;
  scrollbar-width: thin;
}

.attraction-card { flex: 0 0 220px; }

.card-header-bar { height: 4px; }
.cat-museum   { background: var(--p-blue-400); }
.cat-monument { background: var(--p-orange-400); }
.cat-park     { background: var(--p-green-400); }
</style>
