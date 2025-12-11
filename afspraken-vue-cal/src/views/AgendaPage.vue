<script setup>
import { ref, onMounted } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useRouter } from 'vue-router'
import api from '../services/axiosInstance' // jouw axios instance met token

// Events array
const events = ref([])

// Huidige week start (maandag)
const currentWeekStart = ref(new Date())

// Modal state
const showModal = ref(false)
const modalContent = ref('')
const selectedEventId = ref(null) // voor annuleren

const router = useRouter()

// Bereken maandag van een week
function getWeekStart(date = new Date()) {
  const day = date.getDay() // zondag = 0, maandag = 1...
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const weekStart = new Date(date.setDate(diff))
  weekStart.setHours(0,0,0,0)
  return weekStart
}

// Role check uit JWT
function getRoleFromToken() {
  const token = localStorage.getItem('userToken')
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload['role']
  } catch {
    return null
  }
}

// Ophalen van afspraken van de API
async function loadAppointments() {
  try {
    const weekStartISO = currentWeekStart.value.toISOString()
    console.log('API request met weekStart:', weekStartISO)

    const response = await api.get('hospital/appointments/schedule/week', {
      params: { weekStart: weekStartISO }
    })

    const apiData = response.data
    console.log('API response:', apiData)

    const mappedEvents = apiData.length
      ? apiData.map(a => {
          const startDate = new Date(a.startTime)
          const endDate = new Date(a.endTime)
          
          return {
            id: a.id,
            start: startDate,
            end: endDate,
            title: `${a.patientName} (${a.patientId})`,
            content: `Geboortedatum: ${new Date(a.patientBirthDate).toLocaleDateString('nl-NL')} | Type: ${a.appointmentTypeId} | Status: ${a.status}`
          }
        })
      : []

    events.value = mappedEvents

  } catch (err) {
    console.error('Kon afspraken niet laden:', err)
    events.value = []
  }
}

// Week navigatie
function previousWeek() {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  currentWeekStart.value = getWeekStart(newDate)
  loadAppointments()
}

function nextWeek() {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() + 7)
  currentWeekStart.value = getWeekStart(newDate)
  loadAppointments()
}

// Event click handler
function onEventClick(event) {
  modalContent.value = event.content
  selectedEventId.value = event.id
  showModal.value = true
}

// Afspraak annuleren
async function cancelAppointment() {
  if (!selectedEventId.value) return
  try {
    await api.post(`hospital/appointments/appointment/cancel/${selectedEventId.value}`)
    alert('Afspraak geannuleerd!')
    showModal.value = false
    loadAppointments()
  } catch (err) {
    console.error(err)
    alert('Kon afspraak niet annuleren')
  }
}

// Component mount
onMounted(() => {
  const token = localStorage.getItem('userToken')
  if (!token) {
    router.push('/login')
    return
  }

  const role = getRoleFromToken()
  if (role !== 'Doctor') {
    alert('Alleen doctors mogen deze pagina bekijken')
    router.push('/login')
    return
  }

  currentWeekStart.value = getWeekStart()
  loadAppointments()
})
</script>

<template>
  <div style="padding: 20px;">
    <h1>Agenda (Doctor)</h1>

    <!-- Week navigatie -->
    <div style="margin-bottom: 10px;">
      <button @click="previousWeek">Vorige week</button>
      <button @click="nextWeek">Volgende week</button>
      <span style="margin-left: 10px;">Week start: {{ currentWeekStart.toLocaleDateString() }}</span>
    </div>

    <!-- Kalender -->
    <VueCal
      :key="currentWeekStart.getTime()" 
      :events="events"
      default-view="week"
      :start-date="currentWeekStart"
      :editable-events="false"
      style="height: 600px;"
      @event-click="onEventClick"
    />

    <!-- Modal -->
    <div v-if="showModal" style="position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center;">
      <div style="background:white; padding:20px; border-radius:6px; max-width:400px;">
        <h3>Afspraak details</h3>
        <p>{{ modalContent }}</p>
        <div style="margin-top:10px; display:flex; gap:10px;">
          <button @click="cancelAppointment">Annuleren</button>
          <button @click="showModal = false">Sluiten</button>
        </div>
      </div>
    </div>
  </div>
</template>
