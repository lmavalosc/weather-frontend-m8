<script setup>
import { ref, computed } from 'vue'
import { chileCitiesData } from '../data/weatherMock'

const searchQuery = ref('')
const cities = ref(chileCitiesData)

const filteredCities = computed(() => {
  return cities.value.filter(city => 
    city.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
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
      />
    </div>

    <div class="cities-grid">
      <RouterLink 
        v-for="city in filteredCities" 
        :key="city.id" 
        :to="'/lugar/' + city.id"
        class="city-card glass-panel"
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
        </div>
      </RouterLink>
      
      <div v-show="filteredCities.length === 0" class="no-results glass-panel">
        <p>No se encontraron ciudades que coincidan con "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 2rem;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
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
  color: var(--text-muted);
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

.no-results {
  grid-column: 1 / -1;
  padding: 3rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 1.2rem;
}
</style>
