<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const currentUser = computed(() => store.getters['auth/currentUser'])
const preferencias = computed(() => store.getters['auth/preferencias'])
const favoriteIds = computed(() => store.getters['auth/favoritos'])

const setUnidad = (unidad) => {
  store.dispatch('auth/actualizarPreferencias', { unidad })
}

const setTema = (tema) => {
  store.dispatch('auth/actualizarPreferencias', { tema })
}

const logout = async () => {
  await store.dispatch('auth/logout')
  router.push('/login')
}
</script>

<template>
  <div class="perfil-view">
    <h1 class="title">Mi Perfil</h1>

    <!-- Card del usuario -->
    <div class="user-card glass-panel">
      <div class="user-info">
        <div class="avatar-circle">{{ currentUser?.avatar }}</div>
        <div class="user-data">
          <h2 class="user-name">{{ currentUser?.nombre }}</h2>
          <p class="user-email">{{ currentUser?.email }}</p>
          <div class="user-badge">
            <span class="badge-dot"></span>
            Sesión activa
          </div>
        </div>
      </div>
      <div class="user-stats">
        <div class="stat">
          <span class="stat-value">{{ favoriteIds.length }}</span>
          <span class="stat-label">Favoritos</span>
        </div>
      </div>
    </div>

    <!-- Preferencias -->
    <div class="preferences-card glass-panel">
      <h2 class="section-title">⚙️ Mis preferencias</h2>
      <p class="section-desc">Estas preferencias se aplican a toda la app y se guardan en tu perfil.</p>

      <!-- Unidad de temperatura -->
      <div class="pref-group">
        <label class="pref-label">🌡️ Unidad de temperatura</label>
        <div class="toggle-group" role="group" aria-label="Unidad de temperatura">
          <button
            id="pref-celsius-btn"
            class="toggle-btn"
            :class="{ active: preferencias.unidad === 'C' }"
            @click="setUnidad('C')"
          >
            °C Celsius
          </button>
          <button
            id="pref-fahrenheit-btn"
            class="toggle-btn"
            :class="{ active: preferencias.unidad === 'F' }"
            @click="setUnidad('F')"
          >
            °F Fahrenheit
          </button>
        </div>
      </div>

      <!-- Tema -->
      <div class="pref-group">
        <label class="pref-label">🎨 Tema de la aplicación</label>
        <div class="toggle-group" role="group" aria-label="Tema de la aplicación">
          <button
            id="pref-dark-btn"
            class="toggle-btn"
            :class="{ active: preferencias.tema === 'dark' }"
            @click="setTema('dark')"
          >
            🌙 Oscuro
          </button>
          <button
            id="pref-light-btn"
            class="toggle-btn"
            :class="{ active: preferencias.tema === 'light' }"
            @click="setTema('light')"
          >
            ☀️ Claro
          </button>
        </div>
      </div>

      <!-- Preview de la preferencia activa -->
      <div class="pref-preview">
        <span class="preview-label">Configuración actual:</span>
        <span class="preview-value">
          Temperatura en <strong>{{ preferencias.unidad === 'C' ? 'Celsius (°C)' : 'Fahrenheit (°F)' }}</strong>
          · Tema <strong>{{ preferencias.tema === 'dark' ? 'Oscuro 🌙' : 'Claro ☀️' }}</strong>
        </span>
      </div>
    </div>

    <!-- Accesos rápidos -->
    <div class="quick-links glass-panel">
      <h2 class="section-title">🔗 Accesos rápidos</h2>
      <div class="links-grid">
        <RouterLink to="/favoritos" class="quick-link-card">
          <span class="ql-icon">⭐</span>
          <span class="ql-label">Mis favoritos</span>
          <span class="ql-count">{{ favoriteIds.length }} ciudades</span>
        </RouterLink>
        <RouterLink to="/" class="quick-link-card">
          <span class="ql-icon">🌍</span>
          <span class="ql-label">Explorar</span>
          <span class="ql-count">Todas las ciudades</span>
        </RouterLink>
      </div>
    </div>

    <!-- Logout -->
    <div class="logout-section">
      <button id="logout-btn" @click="logout" class="btn btn-danger">
        🚪 Cerrar sesión
      </button>
    </div>
  </div>
</template>

<style scoped>
.perfil-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* User Card */
.user-card {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(167,139,250,0.2));
  border: 2px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  flex-shrink: 0;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.user-email {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.user-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.3);
  color: #86efac;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.user-stats {
  display: flex;
  gap: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Preferences */
.preferences-card {
  padding: 2rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--text-main);
}

.section-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.pref-group {
  margin-bottom: 1.25rem;
}

.pref-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.toggle-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.toggle-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: rgba(15, 23, 42, 0.5);
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.toggle-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.toggle-btn.active {
  background: rgba(56, 189, 248, 0.18);
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

.pref-preview {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid rgba(56, 189, 248, 0.15);
  border-radius: 8px;
  font-size: 0.88rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.preview-label {
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.preview-value {
  color: var(--text-main);
}

/* Quick links */
.quick-links {
  padding: 2rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.quick-link-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.25rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: all 0.25s ease;
}

.quick-link-card:hover {
  border-color: var(--accent);
  background: rgba(56, 189, 248, 0.07);
  transform: translateY(-2px);
}

.ql-icon {
  font-size: 1.75rem;
}

.ql-label {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.95rem;
}

.ql-count {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Logout */
.logout-section {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
}

.btn-danger {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.btn-danger:hover {
  background: rgba(239, 68, 68, 0.4);
  color: white;
}
</style>
