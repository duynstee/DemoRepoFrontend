<template>
  <div>
    <nav
      style="
        padding: 10px;
        background: #f0f0f0;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        align-items: center;
      "
    >
      <!-- Linker kant -->
      <div style="display: flex; gap: 10px">
        <RouterLink to="/agenda">Agenda</RouterLink>
        <RouterLink to="/appointment/new">Nieuwe Afspraak</RouterLink>
      </div>

      <!-- Rechter kant: logout knop -->
      <button
        @click="onLogout"
        style="
          padding: 6px 12px;
          border: none;
          background: #d9534f;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Logout
      </button>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { logout } from "../src/services/authService";

const router = useRouter();

function onLogout() {
  logout(); // verwijdert token
  router.push("/login"); // terug naar login
}
</script>
