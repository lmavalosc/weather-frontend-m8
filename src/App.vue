<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">
      <span class="icon">🇨🇱</span> Clima Chile
    </RouterLink>
  </header>

  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.app-header {
  margin-bottom: 2rem;
  text-align: center;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.icon {
  font-size: 2.5rem;
}
</style>
