<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Formulier velden
const patientId = ref('')
const appointmentTypeId = ref('')
const startTime = ref('')

// API endpoint
const api = 'https://localhost:44381/api/hospital/appointments/appointment'

// Functie om afspraak te maken
async function createAppointment() {
  try {
    const payload = {
      patientId: Number(patientId.value),
      appointmentTypeId: Number(appointmentTypeId.value),
      startTime: new Date(startTime.value) // datetime-local -> Date
    }

    const response = await axios.post(`${api}`, payload)
    alert('Afspraak succesvol aangemaakt!')
    console.log('Response:', response.data)
    
    // Formulier resetten
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
      <input v-model="patientId" type="number" placeholder="Patient ID" />
      <p>appointmentTypeId</p>
      <input v-model="appointmentTypeId" type="number" placeholder="Type ID" />
      <p>Start date</p>
      <input v-model="startTime" type="datetime-local" placeholder="Starttijd" />
      <button @click="createAppointment">Maak Afspraak</button>
    </div>
  </div>
</template>
