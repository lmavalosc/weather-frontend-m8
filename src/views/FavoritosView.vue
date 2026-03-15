<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const currentUser = computed(() => store.getters['auth/currentUser'])
const favoriteIds = computed(() => store.getters['auth/favoritos'])
const allCities = computed(() => store.getters['weather/allCities'])
const isLoading = computed(() => store.getters['weather/isLoading'])

onMounted(() => {
  if (allCities.value.length === 0) {
    store.dispatch('weather/fetchAllCitiesWeather')
  }
})

// Ciudades favoritas del usuario (ahora desde los datos globales vivos de Vuex)
const favoriteCities = computed(() =>
  allCities.value.filter(c => favoriteIds.value.includes(c.id))
)

const toggleFavorito = (cityId) => {
  store.dispatch('auth/toggleFavorito', cityId)
}

const goToCity = (cityId) => {
  router.push(`/lugar/${cityId}`)
}
</script>

<template>
  <div class="favoritos-view">
    <div class="page-header">
      <h1 class="title">⭐ Mis Favoritos</h1>
      <p class="header-subtitle">
        Ciudades guardadas por
        <span class="user-highlight">{{ currentUser?.avatar }} {{ currentUser?.nombre }}</span>
      </p>
    </div>

    <!-- Carga inicial -->
    <div v-if="isLoading" class="empty-state glass-panel">
      <div class="empty-icon">⏳</div>
      <h2>Cargando favoritos...</h2>
    </div>

    <!-- Sin favoritos -->
    <div v-else-if="favoriteCities.length === 0" class="empty-state glass-panel">
      <div class="empty-icon">🌎</div>
      <h2>Aún no tienes favoritos</h2>
      <p>Explora las ciudades y agrega las que más te gusten.</p>
      <RouterLink to="/" class="btn" style="margin-top: 1rem;">Ver ciudades</RouterLink>
    </div>

    <!-- Grid de favoritos -->
    <div v-else class="cities-grid">
      <div
        v-for="city in favoriteCities"
        :key="city.id"
        class="city-card glass-panel"
        @click="goToCity(city.id)"
      >
        <div class="card-bg" :style="{ backgroundImage: `url(${city.image})` }"></div>
        <div class="card-content">
          <div class="city-header">
            <div>
              <h2>{{ city.name }}</h2>
              <span class="region-label">{{ city.region }}</span>
            </div>
            <span class="icon" v-if="city.currentWeather">{{ city.currentWeather.icon }}</span>
          </div>
          <div class="temp-display" v-if="city.currentWeather">
            <span class="temp">{{ city.currentWeather.temp }}°C</span>
            <span class="condition">{{ city.currentWeather.condition }}</span>
          </div>
          <div class="temp-display" v-else>
            <span class="condition" style="color:#ef4444;">Sin conexión a la API</span>
          </div>
          <!-- Botón quitar favorito -->
          <button
            class="remove-fav-btn"
            @click.stop="toggleFavorito(city.id)"
            title="Quitar de favoritos"
          >
            ❌ Quitar
          </button>
        </div>
      </div>
    </div>

    <!-- Explorar más -->
    <div v-if="favoriteCities.length > 0" class="explore-section glass-panel">
      <p>📍 <strong>{{ favoriteCities.length }}</strong> ciudades guardadas · ¿Quieres agregar más?</p>
      <RouterLink to="/" class="btn btn-secondary">Explorar ciudades</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.favoritos-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  text-align: center;
}

.header-subtitle {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-top: -1rem;
}

.user-highlight {
  color: var(--accent);
  font-weight: 600;
}

/* Empty */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-icon {
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.empty-state h2 {
  font-size: 1.5rem;
  color: var(--text-main);
}

.empty-state p {
  color: var(--text-muted);
}

/* Grid */
.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.city-card {
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
  background: none;
  min-height: 220px;
  cursor: pointer;
}

.city-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: var(--accent);
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
  transform: scale(1.08);
}

.card-bg::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(30,41,59,0.3), rgba(15,23,42,0.95));
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
  align-items: flex-start;
}

.city-header h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
}

.region-label {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
  display: block;
  margin-top: 0.2rem;
}

.city-header .icon {
  font-size: 2rem;
}

.temp-display {
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
}

.temp {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.condition {
  font-size: 0.95rem;
  opacity: 0.85;
}

.remove-fav-btn {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.remove-fav-btn:hover {
  background: rgba(239, 68, 68, 0.4);
}

/* Explore section */
.explore-section {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.explore-section p {
  color: var(--text-muted);
}
</style>
