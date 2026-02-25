<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const loading = computed(() => store.getters['auth/authLoading'])
const errorMsg = computed(() => store.getters['auth/authError'])

const handleSubmit = async () => {
  if (!email.value || !password.value) return

  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value
    })
    // Redirigir a la ruta previa o al home
    const redirectTo = route.query.redirect || '/'
    router.push(redirectTo)
  } catch {
    // El error ya está manejado en el store
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card glass-panel">
      <!-- Logo / Cabecera -->
      <div class="login-header">
        <div class="brand-icon">🇨🇱</div>
        <h1 class="login-title">Clima Chile</h1>
        <p class="login-subtitle">Inicia sesión para acceder a tu cuenta</p>
      </div>

      <!-- Usuarios de prueba -->
      <div class="demo-users">
        <p class="demo-label">👥 Usuarios de prueba:</p>
        <div class="demo-list">
          <button class="demo-chip" @click="email = 'ana@clima.cl'; password = '1234'">
            ana@clima.cl / 1234
          </button>
          <button class="demo-chip" @click="email = 'carlos@clima.cl'; password = 'abcd'">
            carlos@clima.cl / abcd
          </button>
          <button class="demo-chip" @click="email = 'sofia@clima.cl'; password = 'pass123'">
            sofia@clima.cl / pass123
          </button>
        </div>
      </div>

      <!-- Formulario -->
      <form class="login-form" @submit.prevent="handleSubmit" id="login-form" novalidate>
        <!-- Mensaje de error -->
        <transition name="slide-down">
          <div v-if="errorMsg" class="error-alert" role="alert">
            <span>⚠️</span> {{ errorMsg }}
          </div>
        </transition>

        <div class="form-group">
          <label for="login-email" class="form-label">Correo electrónico</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input
              id="login-email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="tu@correo.cl"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="login-password" class="form-label">Contraseña</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              id="login-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Tu contraseña"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <button
          id="login-submit-btn"
          type="submit"
          class="btn login-btn"
          :disabled="loading || !email || !password"
        >
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>
      </form>

      <div class="login-footer">
        <p>¿No tienes cuenta?
          <RouterLink to="/registro" class="link-accent">Crear cuenta</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem 0;
}

.login-card {
  width: 100%;
  max-width: 460px;
  padding: 2.5rem;
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.brand-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #38bdf8, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
}

.login-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Demo chips */
.demo-users {
  background: rgba(56, 189, 248, 0.07);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.demo-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.demo-chip {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #7dd3fc;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: 'Courier New', monospace;
}

.demo-chip:hover {
  background: rgba(56, 189, 248, 0.2);
  border-color: var(--accent);
  color: white;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  font-size: 1rem;
  pointer-events: none;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 0.85rem 3rem 0.85rem 2.75rem;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  background: rgba(15, 23, 42, 0.6);
  color: white;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.toggle-password:hover {
  color: var(--accent);
}

/* Error */
.error-alert {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Submit button */
.login-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(15, 23, 42, 0.4);
  border-top-color: #0f172a;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.link-accent {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link-accent:hover {
  color: #7dd3fc;
}
</style>
