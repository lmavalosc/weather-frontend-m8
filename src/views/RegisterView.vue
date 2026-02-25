<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const loading = computed(() => store.getters['auth/authLoading'])
const errorMsg = computed(() => store.getters['auth/authError'])

const localError = ref('')

const handleSubmit = async () => {
  localError.value = ''

  if (!nombre.value.trim()) {
    localError.value = 'El nombre es obligatorio'
    return
  }
  if (!email.value || !email.value.includes('@')) {
    localError.value = 'Ingresa un correo válido'
    return
  }
  if (password.value.length < 4) {
    localError.value = 'La contraseña debe tener al menos 4 caracteres'
    return
  }
  if (password.value !== confirmPassword.value) {
    localError.value = 'Las contraseñas no coinciden'
    return
  }

  try {
    await store.dispatch('auth/register', {
      nombre: nombre.value.trim(),
      email: email.value.trim(),
      password: password.value
    })
    router.push('/')
  } catch {
    // El error ya está manejado en el store
  }
}

const displayError = computed(() => localError.value || errorMsg.value)
</script>

<template>
  <div class="register-page">
    <div class="register-card glass-panel">
      <!-- Header -->
      <div class="register-header">
        <div class="brand-icon">🌤️</div>
        <h1 class="register-title">Crear cuenta</h1>
        <p class="register-subtitle">Únete para guardar tus ciudades favoritas</p>
      </div>

      <!-- Formulario -->
      <form class="register-form" @submit.prevent="handleSubmit" id="register-form" novalidate>
        <!-- Error -->
        <transition name="slide-down">
          <div v-if="displayError" class="error-alert" role="alert">
            <span>⚠️</span> {{ displayError }}
          </div>
        </transition>

        <!-- Nombre -->
        <div class="form-group">
          <label for="reg-nombre" class="form-label">Nombre completo</label>
          <div class="input-wrapper">
            <span class="input-icon">🧑</span>
            <input
              id="reg-nombre"
              v-model="nombre"
              type="text"
              class="form-input"
              placeholder="Tu nombre"
              autocomplete="name"
              required
            />
          </div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="reg-email" class="form-label">Correo electrónico</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input
              id="reg-email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="tu@correo.cl"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="reg-password" class="form-label">Contraseña</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              id="reg-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Mínimo 4 caracteres"
              autocomplete="new-password"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >{{ showPassword ? '🙈' : '👁️' }}</button>
          </div>
        </div>

        <!-- Confirmar Password -->
        <div class="form-group">
          <label for="reg-confirm" class="form-label">Confirmar contraseña</label>
          <div class="input-wrapper">
            <span class="input-icon">🔑</span>
            <input
              id="reg-confirm"
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Repite tu contraseña"
              autocomplete="new-password"
              required
            />
          </div>
        </div>

        <button
          id="register-submit-btn"
          type="submit"
          class="btn register-btn"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>
      </form>

      <div class="register-footer">
        <p>¿Ya tienes cuenta?
          <RouterLink to="/login" class="link-accent">Iniciar sesión</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem 0;
}

.register-card {
  width: 100%;
  max-width: 460px;
  padding: 2.5rem;
}

.register-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.brand-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.register-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #38bdf8, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
}

.register-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
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

.register-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.register-btn:disabled {
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

.register-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.link-accent {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.link-accent:hover {
  color: #7dd3fc;
}
</style>
