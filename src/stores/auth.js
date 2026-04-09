import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const plate = ref(null)

    const isLoggedIn = computed(() => !!plate.value)

    function login(newPlate) {
      plate.value = newPlate
    }

    function logout() {
      plate.value = null
    }

    return {
      plate,
      isLoggedIn,
      login,
      logout
    }
  },
  {
    persist: true
  }
)
