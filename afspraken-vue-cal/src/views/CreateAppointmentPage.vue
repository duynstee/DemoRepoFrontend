<script setup>
import { ref } from 'vue'
import api from '../services/axiosInstance'   // JUISTE IMPORT!

// Form fields
const patientId = ref('')
const appointmentTypeId = ref('')
const startTime = ref('')

// Functie om afspraak te maken
async function createAppointment() {
  try {
    const payload = {
      patientId: Number(patientId.value),
      appointmentTypeId: Number(appointmentTypeId.value),
      startTime: new Date(startTime.value)
    }

    const response = await api.post(
      'hospital/appointments/appointment',
      payload
    )

    alert('Afspraak succesvol aangemaakt!')
    console.log('Response:', response.data)

    patientId.value = ''
    appointmentTypeId.value = ''
    startTime.value = ''
  } catch (err) {
    console.error(err)
    alert('Fout bij aanmaken afspraak')
  }
}
</script>

<template>
  <div style="padding: 20px;">
    <h1>Nieuwe Afspraak</h1>
    <div style="display:flex; flex-direction: column; gap: 10px; max-width: 400px;">
      <p>patientId</p>
      <input v-model="patientId" type="number" />
      <p>appointmentTypeId</p>
      <input v-model="appointmentTypeId" type="number" />
      <p>Start date</p>
      <input v-model="startTime" type="datetime-local" />
      <button @click="createAppointment">Maak Afspraak</button>
    </div>
  </div>
</template>
