# App de Clima Chile 🇨🇱 (SPA con Vue.js)

## 📌 Descripción General
"**Clima Chile**" es una aplicación de una sola página (SPA - Single Page Application) interactiva, desarrollada íntegramente en **Vue 3** y empaquetada con **Vite**. 

El propósito principal del proyecto es proveer a los usuarios un informe meteorológico estilizado y rápido sobre las **16 Capitales Regionales de Chile** (desde Arica y Parinacota por el norte, abarcando hasta Magallanes y de la Antártica Chilena en el soleado extremo austral del país). Todo sucede en una navegación instantánea, fluida y sin recargas en el navegador, poniendo a prueba conceptos fundamentales de Vue como interpolación, directivas reactivas, Two-way Data Binding y manejo de rutas con `vue-router`.

## 🌌 Temática y Diseño Visual
Se abandonó el aspecto monocromático genérico apostando por un diseño Premium y minimalista. La UI/UX fue construida desde cero:
*   Integra el popular efecto **Glassmorphism** (paneles translúcidos y bordes difuminados).
*   Emplea tarjetas (cards) fotográficas en alta resolución de las ciudades de Chile extraídas estáticamente mediante un compilador.
*   Usa CSS nativo a gran escala con micro-animaciones en los efectos *hover* para generar respuesta inmediata y placer visual en cada interacción.
*   **Estética adaptativa**: Los fondos cambian inteligentemente cuando se selecciona una ciudad asimilando los colores locales mientras un gradiente oscuro garantiza que el texto nunca pierda contraste.

## 🚀 Características y Funcionalidad
*   **Home ('/'): Listado Fotográfico Fluido y Motor de Búsqueda:** La página principal no sólo exhibe de golpe las 16 tarjetas fotográficas con la temperatura y la condición del clima actual ("Despejado", "Nublado", "Lluvia"), sino que añade un formulario transparente en la cabecera. A través de un enlace de `v-model` el usuario puede filtrar las tarjetas de las ciudades escribiendo a tiempo real de forma responsiva.
*   **Detalle ('/lugar/:id'): Perfil Meteorológico Integral:** Selección programática que inyecta parámetros en la barra del navegador (rutas dinámicas de vue-router). En esta ventana el usuario tiene acceso a un pronóstico detallado, información sobre valores Mínimos, Máximos y un Promedio de las condiciones semanales junto a una descripción turística de su relieve y ubicación territorial de Chile.
*   **Interactividad Extra: Conversor Unidades Térmicas Integrado:** Requisito especial adicional de control de estado. Con un simple click en las vistas de Detalle, todo el componente actualiza y recalcula dinámicamente sus valores numéricos transformando los centígrados originales (°C) al equivalente de la escala fahrenheit (°F) dentro del mismo componente sin requerir recarga externa.

## 🛣️ Vistas y Rutas
1.  **`/` (`HomeView.vue`):** Listado principal de ciudades chilenas con motor de búsqueda y tarjetas climáticas en grid fotográfica.
2.  **`/lugar/:id` (`DetailView.vue`):** Renderizado dinámico condicionado (`v-if`) mostrando datos extendidos por ciudad con fondos envolventes adaptativos.

## 👨‍💻 Ecosistema Técnico de Vue
*   **Enrutador (`vue-router`):** Configurado en modo historia (Web History) para el manejo natural del estado de la URL.
*   **Composición de Estado Local:** Uso constante de `ref()` (para búsqueda y formato de grados) y `computed()` (para filtrar lista) centralizados en `<script setup>`.
*   **Directivas Nativas:** 
    *   `v-for` para renderizar colecciones del MockData.
    *   `v-show` para dar feedback visual amigable si el buscador devuelve "0" coincidencias.
    *   `v-model` para la barra de búsqueda (Two-way data binding reactivo sin delays).
*   **Eventos:** (`@click`) aplicado a funciones lógicas, navegación programática entre retrocesos de ventanas y en conversores de formato (°C / °F).

## 🛠️ Instrucciones de Instalación y Ejecución

*Este proyecto es parte del Módulo 6 del plan de desarrollo frontend y requiere Node.js instalado globalmente.*

1.  Clona este repositorio o descarga y extrae el archivo `.zip`:
    ```bash
    git clone https://github.com/lmavalosc/app-clima-vue-spa.git
    cd app-clima-vue-spa
    ```
2.  Inicializa los paquetes en base a la configuración existente de npm (creará la carpeta `node_modules` localmente pero no estará subida al repo remoto):
    ```bash
    npm install
    ```
3.  Arranca la instancia del servidor de pruebas en formato de desarrollo (Hot Module Replacement) impulsado por Vite:
    ```bash
    npm run dev
    ```
4.  Copia en tu navegador web la dirección asignada por el terminal, tradicionalmente la ruta oficial será:
   ```url
   http://localhost:5173
   ```

## 🔗 Repositorio Oficial
Puedes acceder al código fuente completo y al historial de versiones desde el **[repositorio oficial del proyecto en GitHub](https://github.com/lmavalosc/weather-frontend-m6)**.
