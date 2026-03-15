# 🇨🇱 Clima Chile - App de Clima con Vue.js

Una aplicación SPA (Single Page Application) del clima en Chile construida con Vue 3, Vue Router y Vuex.

## 🚀 Demo

> Ejecuta localmente siguiendo las instrucciones más abajo.

## ✨ Características

### Módulo 6 – SPA Base
- Listado de 16 ciudades chilenas con datos meteorológicos mock
- Vista de detalle por ciudad con pronóstico y estadísticas
- Búsqueda de ciudades en tiempo real
- Diseño glassmorphism oscuro y responsive
- Transiciones animadas entre vistas

### Módulo 7 – Usuarios, Login y Estado Global (nuevo)
- **Sistema de autenticación simulado** con usuarios mock
- **Vuex Store** con módulo `auth` (namespaced) para gestionar el estado global de sesión
- **Login** con formulario, validación de credenciales, manejo de errores y redirección post-login
- **Registro** de nuevos usuarios con validación en el cliente
- **Rutas protegidas** (`/favoritos`, `/perfil`) con navigation guards en Vue Router
- **Persistencia de sesión** en `localStorage`
- **Navbar dinámico** que muestra el avatar y nombre del usuario autenticado
- **Favoritos por usuario**: guardar/quitar ciudades favoritas (leídos desde Vuex)
- **Preferencias personales**: unidad de temperatura (°C/°F) y tema (claro/oscuro) guardados en Vuex
- **La preferencia de temperatura se aplica** en la vista de detalle (°C o °F según el perfil del usuario)

### Módulo 8 – Proyecto Final (Integración API, Estadísticas y Alertas)
- **Consumo de API Real**: Integración con la API de Open-Meteo usando `fetch` para obtener datos climáticos actuales y pronósticos de los próximos días.
- **Manejo de Estado Global (Módulo Weather)**: `Vuex` gestiona las llamadas a la API, la lista de ciudades con clima actualizado, la ciudad seleccionada y los estados de carga y error.
- **Manejo de Estados de Petición**: UI para los estados "Cargando datos..." y despliegue de mensajes de error amigables en caso de fallas de la API.
- **Cálculo de Estadísticas**: Se calculan promedios, temperaturas mínimas y máximas basándose en la data obtenida en tiempo real para una semana completa.
- **Generación de Alertas**: Se agregó una regla basada en la respuesta de la API que verifica los próximos días y lanza una alerta en la vista principal si se prevé una ola de calor (temperaturas ≥ 30°C).
- **Estabilidad, fluidez y Manejo de Errores**: La aplicación maneja caídas en la respuesta de la API mediante bloques `try-catch` y en rutas no encontradas.

---

## 🔐 Sistema de Autenticación

### Flujo de Login
1. El usuario ingresa su correo y contraseña en `/login`
2. La acción `auth/login` en Vuex llama a la función `authLogin()` (asíncrona, simula latencia de red)
3. Si las credenciales son correctas → mutation `LOGIN_SUCCESS` → estado `isAuthenticated: true` → redirige al home
4. Si son incorrectas → mutation `SET_ERROR` → se muestra el mensaje "Usuario o contraseña incorrectos"

### Flujo de Cierre de Sesión
1. El usuario hace clic en "Salir" en el navbar
2. La acción `auth/logout` ejecuta la mutation `LOGOUT`
3. Se limpia el estado de usuario en Vuex y se elimina `clima_user` de `localStorage`
4. Se redirige a `/login`

### Usuarios de prueba (credenciales mock)
| Nombre | Correo | Contraseña | Favoritos |
|--------|--------|------------|-----------|
| Ana García | `ana@clima.cl` | `1234` | Santiago, Valparaíso, Puerto Montt |
| Carlos Mendoza | `carlos@clima.cl` | `abcd` | Arica, Iquique, Antofagasta |
| Sofía Torres | `sofia@clima.cl` | `pass123` | Temuco, Valdivia, Coyhaique, Punta Arenas |

---

## 🗺️ Rutas de la aplicación

| Ruta | Nombre | Acceso |
|------|--------|--------|
| `/` | home | Público |
| `/lugar/:id` | detail | Público |
| `/login` | login | Solo no autenticados |
| `/registro` | registro | Solo no autenticados |
| `/favoritos` | favoritos | **Requiere sesión** |
| `/perfil` | perfil | **Requiere sesión** |

### Rutas protegidas
Las rutas `/favoritos` y `/perfil` están protegidas mediante el `meta: { requiresAuth: true }` en la configuración del router y el guard global `router.beforeEach()`. Si un usuario no autenticado intenta acceder, es redirigido automáticamente a `/login?redirect=[ruta-original]`. Tras iniciar sesión correctamente, se lo redirige a la ruta que intentaba visitar.

---

## 🏗️ Estructura del proyecto

```
src/
├── assets/
│   └── style.css            # Estilos globales
├── data/
│   ├── weatherMock.js       # Datos de ciudades
│   └── usersMock.js         # Usuarios mock + funciones de auth simulada
├── store/
│   ├── index.js             # Store raíz de Vuex
│   └── modules/
│       └── auth.js          # Módulo de autenticación (state, getters, mutations, actions)
├── router/
│   └── index.js             # Rutas + navigation guards
├── views/
│   ├── HomeView.vue         # Listado de ciudades con favoritos
│   ├── DetailView.vue       # Detalle de ciudad (temp. según preferencias Vuex)
│   ├── LoginView.vue        # Formulario de login
│   ├── RegisterView.vue     # Formulario de registro
│   ├── FavoritosView.vue    # Ruta privada: mis favoritos
│   └── PerfilView.vue       # Ruta privada: perfil y preferencias
├── App.vue                  # Componente raíz con navbar dinámico
└── main.js                  # Punto de entrada (registra Vue Router + Vuex)
```

---

## 🗃️ Vuex Store – Módulo `auth`

### State
```js
{
  currentUser: null | { id, nombre, email, avatar, preferencias, favoritos },
  isAuthenticated: false,
  loading: false,
  error: null
}
```

### Mutations
| Mutation | Descripción |
|----------|-------------|
| `SET_LOADING` | Activa/desactiva el flag de carga |
| `SET_ERROR` | Guarda un mensaje de error |
| `CLEAR_ERROR` | Limpia el mensaje de error |
| `LOGIN_SUCCESS` | Guarda el usuario en estado + localStorage |
| `LOGOUT` | Limpia el estado + elimina de localStorage |
| `UPDATE_PREFERENCIAS` | Actualiza preferencias del usuario |
| `TOGGLE_FAVORITO` | Agrega/quita una ciudad de favoritos |

### Actions
| Action | Descripción |
|--------|-------------|
| `auth/login` | Autentica al usuario (asíncrono, simula API) |
| `auth/register` | Registra un nuevo usuario (asíncrono) |
| `auth/logout` | Cierra la sesión |
| `auth/actualizarPreferencias` | Actualiza preferencias de temperatura/tema |
| `auth/toggleFavorito` | Agrega/quita ciudad de la lista de favoritos |

---

## 🛠️ Requisitos e Instalación

### Requisitos previos
- Node.js (v16.0 o superior recomendado)
- npm (Node Package Manager)

### Ejecución local

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPO>
cd app-clima-m7-login-vuex

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Renombra o copia el archivo .env.example a .env
cp .env.example .env
# El archivo .env contiene VITE_API_URL=https://api.open-meteo.com/v1/forecast para la API (no requiere Key obligatoria)

# 4. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🔗 Repositorio

[GitHub – lmavalosc/weather-frontend-m7](https://github.com/lmavalosc/weather-frontend-m7)

---

## 🧰 Stack tecnológico

| Tecnología | Versión |
|-----------|---------|
| Vue.js | 3.x |
| Vue Router | 4.x |
| Vuex | 4.x |
| Vite | 5.x |
