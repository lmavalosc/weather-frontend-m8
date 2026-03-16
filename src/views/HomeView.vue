<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const searchQuery = ref('')
const cities = computed(() => store.getters['weather/allCities'])
const isLoading = computed(() => store.getters['weather/isLoading'])
const hasError = computed(() => store.getters['weather/hasError'])
const alertMessage = computed(() => store.getters['weather/alertMessage'])

onMounted(() => {
  store.dispatch('weather/fetchAllCitiesWeather')
})

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const favoriteIds = computed(() => store.getters['auth/favoritos'])

const filteredCities = computed(() => {
  return cities.value.filter(city =>
    city.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isFavorito = (cityId) => favoriteIds.value.includes(cityId)

const toggleFavorito = (event, cityId) => {
  event.preventDefault()
  event.stopPropagation()
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  store.dispatch('auth/toggleFavorito', cityId)
}
</script>

<template>
  <div class="home-view">
    <h1 class="title">Clima en Chile</h1>

    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar una ciudad..."
        class="search-input"
        id="home-search"
        aria-label="Buscar una ciudad"
        :disabled="isLoading"
      />
    </div>

    <!-- Alertas y estados (Load/Error/Alert) -->
    <div v-if="alertMessage" class="alert-banner glass-panel">
      ⚠️ {{ alertMessage }}
    </div>
    
    <div v-if="hasError" class="error-banner glass-panel">
      ❌ {{ hasError }}
    </div>
    
    <div v-if="isLoading" class="loading-container glass-panel">
      <div class="spinner"></div>
      <p>Cargando datos del clima en tiempo real...</p>
    </div>

    <div v-else class="cities-grid">
      <RouterLink
        v-for="city in filteredCities"
        :key="city.id"
        :to="'/lugar/' + city.id"
        class="city-card glass-panel"
        :class="{ 'is-fav': isFavorito(city.id) }"
      >
        <div class="card-bg" :style="{ backgroundImage: `url(${city.image})` }"></div>
        <div class="card-content">
          <div class="city-header">
            <div>
              <h2>{{ city.name }}</h2>
              <span class="region-label">{{ city.region }}</span>
            </div>
            <span class="icon">{{ city.currentWeather.icon }}</span>
          </div>
          <div class="temp-display">
            <span class="temp">{{ city.currentWeather.temp }}°C</span>
            <span class="condition">{{ city.currentWeather.condition }}</span>
          </div>
          <!-- Botón favorito -->
          <button
            class="fav-btn"
            :class="{ active: isFavorito(city.id) }"
            @click="toggleFavorito($event, city.id)"
            :title="isFavorito(city.id) ? 'Quitar de favoritos' : (isAuthenticated ? 'Guardar como favorito' : 'Inicia sesión para guardar favoritos')"
          >
            {{ isFavorito(city.id) ? '⭐' : '☆' }}
          </button>
        </div>
      </RouterLink>

      <div v-show="filteredCities.length === 0" class="no-results glass-panel">
        <p>No se encontraron ciudades que coincidan con "{{ searchQuery }}"</p>
      </div>
    </div>

    <!-- Banner de invitación si no está autenticado -->
    <transition name="fade">
      <div v-if="!isAuthenticated" class="auth-banner glass-panel">
        <span class="banner-icon">🌟</span>
        <div class="banner-text">
          <strong>¿Quieres guardar tus ciudades favoritas?</strong>
          <span>Inicia sesión o crea una cuenta gratis.</span>
        </div>
        <RouterLink to="/login" class="btn">Iniciar sesión</RouterLink>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.alert-banner {
  background: rgba(234, 179, 8, 0.2);
  border: 1px solid rgba(234, 179, 8, 0.5);
  color: #fef08a;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
}

.error-banner {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #fca5a5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  margin-bottom: 2rem;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.1);
  border-left-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.search-container {
  margin-bottom: 2rem;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.city-card {
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
  background: none;
  min-height: 250px;
}

.city-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: var(--accent);
}

.city-card.is-fav {
  border-color: rgba(251, 191, 36, 0.5);
}

.card-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.5s ease;
}

.city-card:hover .card-bg {
  transform: scale(1.1);
}

.card-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(30,41,59,0.2), rgba(15,23,42,0.95));
}

.card-content {
  padding: 1.5rem;
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.city-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.region-label {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
  display: block;
  margin-top: 0.25rem;
}

.city-header .icon {
  font-size: 2.5rem;
}

.temp-display {
  display: flex;
  flex-direction: column;
}

.temp {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.condition {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Fav button */
.fav-btn {
  align-self: flex-end;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  padding: 0.3rem 0.6rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.fav-btn:hover {
  background: rgba(251, 191, 36, 0.2);
  border-color: rgba(251, 191, 36, 0.5);
  transform: scale(1.1);
}

.fav-btn.active {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.5);
}

/* No results */
.no-results {
  grid-column: 1 / -1;
  padding: 3rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 1.2rem;
}

/* Auth banner */
.auth-banner {
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  background: rgba(56, 189, 248, 0.07);
  border-color: rgba(56, 189, 248, 0.25);
}

.banner-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.banner-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
  min-width: 180px;
}

.banner-text strong {
  color: var(--text-main);
}

.banner-text span {
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
