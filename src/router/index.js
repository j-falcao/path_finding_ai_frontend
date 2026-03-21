import { createRouter, createWebHistory } from 'vue-router'
import MapSearch from '../pages/MapSearchPage.vue'
import GraphEditorPage from '../pages/GraphEditorPage.vue'
import AlgorithmsPage from '../pages/AlgorithmsPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: MapSearch },
    { path: "/editor", component: GraphEditorPage },
    { path: "/algorithms", component: AlgorithmsPage },
    { path: "/about", component: AboutPage }
  ]
})

export default router
