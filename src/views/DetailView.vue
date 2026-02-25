<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { chileCitiesData } from '../data/weatherMock'

const route = useRoute()
const router = useRouter()
const store = useStore()

// Preferencias del usuario desde Vuex
const preferencias = computed(() => store.getters['auth/preferencias'])
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const favoriteIds = computed(() => store.getters['auth/favoritos'])

// La unidad de temperatura viene de Vuex (preferencias del usuario)
const isCelsius = computed(() => preferencias.value.unidad === 'C')

const city = computed(() => {
  return chileCitiesData.find(c => c.id === route.params.id)
})

const goBack = () => {
  router.push('/')
}

const formatTemp = (tempC) => {
  if (isCelsius.value) return `${tempC}°C`
  const tempF = Math.round((tempC * 9 / 5) + 32)
  return `${tempF}°F`
}

const isFavorito = computed(() => {
  return city.value ? favoriteIds.value.includes(city.value.id) : false
})

const toggleFavorito = () => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  store.dispatch('auth/toggleFavorito', city.value.id)
}

const toggleTempUnit = () => {
  const nuevaUnidad = isCelsius.value ? 'F' : 'C'
  store.dispatch('auth/actualizarPreferencias', { unidad: nuevaUnidad })
}
</script>

<template>
  <div class="detail-view" v-if="city">
    <div class="top-bar">
      <button @click="goBack" class="btn btn-secondary back-btn">
        ← Volver al inicio
      </button>
      <!-- Botón favorito en el detalle -->
      <button
        id="detail-fav-btn"
        class="fav-btn"
        :class="{ active: isFavorito }"
        @click="toggleFavorito"
        :title="isFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"
      >
        {{ isFavorito ? '⭐ En favoritos' : '☆ Agregar a favoritos' }}
      </button>
    </div>

    <!-- Indicador de preferencia de usuario -->
    <div v-if="isAuthenticated" class="user-pref-banner">
      <span>🌡️ Mostrando temperaturas en {{ isCelsius ? 'Celsius (°C)' : 'Fahrenheit (°F)' }} según tus preferencias</span>
      <RouterLink to="/perfil" class="pref-link">Cambiar en perfil →</RouterLink>
    </div>

    <div class="city-detail glass-panel"
      :style="city ? { backgroundImage: `linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.95)), url(${city.image})` } : {}">
      <div class="header-section">
        <div>
          <h1 class="title">{{ city.name }}</h1>
          <h3 class="region-subtitle">{{ city.region }}</h3>
          <p class="description">{{ city.description }}</p>
        </div>
        <div class="current-weather">
          <span class="main-icon">{{ city.currentWeather.icon }}</span>
          <div class="temp-switch-container">
            <span class="main-temp">{{ formatTemp(city.currentWeather.temp) }}</span>
            <button id="detail-temp-toggle" @click="toggleTempUnit" class="temp-toggle">
              Cambiar a {{ isCelsius ? '°F' : '°C' }}
            </button>
          </div>
          <span class="condition">{{ city.currentWeather.condition }}</span>
        </div>
      </div>

      <div class="grid layout-grid">
        <div class="forecast-section glass-panel inner-panel">
          <h2 class="subtitle">Pronóstico</h2>
          <div class="forecast-list">
            <div
              v-for="(day, index) in city.forecast"
              :key="index"
              class="forecast-item"
            >
              <span class="day">{{ day.day }}</span>
              <span class="icon">{{ day.icon }}</span>
              <span class="temp">{{ formatTemp(day.temp) }}</span>
            </div>
          </div>
        </div>

        <div class="stats-section glass-panel inner-panel">
          <h2 class="subtitle">Estadísticas (Semana)</h2>
          <div class="stats-list">
            <div class="stat-item">
              <span class="label">Mínima</span>
              <span class="value">{{ formatTemp(city.stats.min) }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Máxima</span>
              <span class="value">{{ formatTemp(city.stats.max) }}</span>
            </div>
            <div class="stat-item">
              <span class="label">Promedio</span>
              <span class="value">{{ formatTemp(city.stats.average) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found glass-panel">
    <h2 class="title">Ciudad no encontrada</h2>
    <p>El lugar que buscas no existe o está fuera del radar.</p>
    <button @click="goBack" class="btn" style="margin-top: 2rem;">Volver al inicio</button>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-btn {
  /* sin margen extra, lo maneja .top-bar */
}

/* Fav button en detalle */
.fav-btn {
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.fav-btn:hover {
  background: rgba(251, 191, 36, 0.2);
  border-color: rgba(251, 191, 36, 0.5);
}

.fav-btn.active {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.6);
  color: #fbbf24;
}

/* Pref banner */
.user-pref-banner {
  background: rgba(56, 189, 248, 0.07);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 10px;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.pref-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
}

.pref-link:hover {
  color: #7dd3fc;
}

.city-detail {
  padding: 3rem;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
}

.title {
  text-align: left;
  margin-bottom: 0.5rem;
}

.region-subtitle {
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.description {
  font-size: 1.2rem;
  color: var(--text-muted);
  max-width: 500px;
  line-height: 1.6;
}

.current-weather {
  text-align: center;
  background: rgba(0,0,0,0.2);
  padding: 2rem;
  border-radius: 20px;
  min-width: 250px;
}

.main-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1rem;
}

.temp-switch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.main-temp {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
}

.temp-toggle {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.temp-toggle:hover {
  background: var(--accent);
  color: var(--bg-dark);
}

.condition {
  font-size: 1.2rem;
  color: var(--text-muted);
}

.layout-grid {
  grid-template-columns: 1fr 1fr;
}

.inner-panel {
  background: rgba(15,23,42,0.5);
  box-shadow: none;
  padding: 2rem;
  border-radius: 16px;
}

.forecast-list {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0,0,0,0.2);
  padding: 1.5rem 1rem;
  border-radius: 16px;
  flex: 1;
}

.forecast-item .day {
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.forecast-item .icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.forecast-item .temp {
  font-size: 1.5rem;
  font-weight: 700;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.2);
  padding: 1rem 1.5rem;
  border-radius: 12px;
}

.stat-item .label {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.stat-item .value {
  font-size: 1.2rem;
  font-weight: 600;
}

.not-found {
  padding: 4rem;
  text-align: center;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
  }

  .current-weather {
    width: 100%;
  }

  .layout-grid {
    grid-template-columns: 1fr;
  }
}
</style>
