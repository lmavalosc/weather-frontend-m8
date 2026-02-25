<script setup>
import { computed, watch } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const currentUser = computed(() => store.getters['auth/currentUser'])
const preferencias = computed(() => store.getters['auth/preferencias'])

watch(
  () => preferencias.value?.tema,
  (newTema) => {
    if (newTema === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  },
  { immediate: true }
)

const logout = async () => {
  await store.dispatch('auth/logout')
  router.push('/login')
}
</script>

<template>
  <header class="app-header glass-panel">
    <RouterLink to="/" class="logo" id="nav-logo">
      <span class="logo-icon">🇨🇱</span>
      <span class="logo-text">Clima Chile</span>
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/" class="nav-link" id="nav-home">Inicio</RouterLink>

      <!-- Autenticado -->
      <template v-if="isAuthenticated">
        <RouterLink to="/favoritos" class="nav-link" id="nav-favoritos">⭐ Favoritos</RouterLink>
        <RouterLink to="/perfil" class="nav-link" id="nav-perfil">Perfil</RouterLink>

        <div class="user-menu">
          <span class="user-avatar">{{ currentUser?.avatar }}</span>
          <span class="user-name">{{ currentUser?.nombre?.split(' ')[0] }}</span>
          <button id="nav-logout-btn" class="btn btn-logout" @click="logout">Salir</button>
        </div>
      </template>

      <!-- No autenticado -->
      <template v-else>
        <RouterLink to="/login" class="btn btn-login" id="nav-login-btn">Iniciar sesión</RouterLink>
      </template>
    </nav>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-radius: 16px;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo {
  text-decoration: none;
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(to right, #38bdf8, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent);
  background: rgba(56, 189, 248, 0.08);
}

/* User menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 30px;
  padding: 0.35rem 0.75rem;
}

.user-avatar {
  font-size: 1.2rem;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
}

.btn-logout {
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--glass-border);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-logout:hover {
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.1);
}

.btn-login {
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
