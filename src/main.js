import { createApp } from 'vue'
import { createPinia } from 'pinia'

import TestGraph from './TestGraph.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './router'

const app = createApp(TestGraph)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app')
