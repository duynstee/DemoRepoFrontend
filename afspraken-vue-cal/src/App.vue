<template>
  <div>
    <nav style="padding: 10px; background: #f0f0f0; display: flex; gap: 10px;">
      <RouterLink to="/agenda">Agenda</RouterLink>
      <RouterLink to="/appointment/new">Nieuwe Afspraak</RouterLink>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
