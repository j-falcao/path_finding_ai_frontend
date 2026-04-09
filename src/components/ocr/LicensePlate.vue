<template>
  <div>
    <FileUpload
      v-if="!auth.isLoggedIn"
      mode="basic"
      accept="image/*"
      customUpload
      :auto="true"
      @select="handleImageUpload"
      chooseLabel="Upload License Plate"

      class="mb-2 w-full"
    />
    <div v-else class="user-info">
      <h4>License Plate: {{ auth.plate }}</h4>
      <Button label="Logout" icon="pi pi-sign-out" severity="danger" @click="auth.logout" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import { useToast } from 'primevue/usetoast'
import { license_plate } from '../../services/api'
import { useAuthStore } from '../../stores/auth'

const toast = useToast()

const auth = useAuthStore()

async function handleImageUpload(event) {
  const file = event.files?.[0]
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await license_plate(formData)

    auth.login(response.plate || null)

  } catch (err) {
    console.error(err)

    toast.add({
      severity: 'error',
      summary: 'OCR Failed',
      detail: 'Could not read license plate',
      life: 3000,
    })
  }
}

</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
