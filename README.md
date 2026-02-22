# App de Clima Planetario (SPA con Vue.js)

## 🌌 Temática
Esta aplicación está basada en un concepto **Interestelar / Planetario**, donde puedes revisar el clima no solo de la Tierra, sino de lugares hostiles e increíbles en nuestro Sistema Solar, como Marte, Venus, Júpiter y Titán. Todo usando una interfaz "Glassmorphism" futurista y moderna, adecuada a la temática.

## 🚀 Características
*   **Single Page Application (SPA):** Navegación fluida sin recargas utilizando `vue-router`.
*   **Listado (Home):** Muestra el listado de planetas con su clima actual.
*   **Detalle:** Permite visualizar información extendida del clima de un planeta específico, como pronóstico y estadísticas.
*   **Búsqueda Dinámica:** Filtro interactivo en el inicio utilizando `v-model` (Two-way data binding).
*   **Interactividad Extra:** Opción de cambiar de unidad de temperatura (Celsius a Fahrenheit) en la vista de detalle.
*   **Diseño Moderno:** CSS clásico utilizando variables nativas, flexbox y CSS Grid para una estética Premium.

## 🛣️ Vistas y Rutas
1.  **`/` (HomeView):** Listado principal de planetas con un input para filtrar lugares mediante `v-model`. 
2.  **`/lugar/:id` (DetailView):** Vista detallada generada de manera dinámica que incluye botón de volver, estado actual, pronóstico de próximos días y estadísticas semanales.

## 🛠️ Instrucciones de Ejecución

1.  Abre una terminal en la raíz del proyecto.
2.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abre el enlace proporcionado en tu navegador (usualmente `http://localhost:5173`).

## 👨‍💻 Componentes y Conceptos de Vue utilizados

*   **Enrutador (`vue-router`):** Configurado para uso de historial web y vistas intercambiables dinámicamente. Pasa parámetros por URL.
*   **`ref` y `computed`:** Para manejar el estado interno de filtrado e interactividad (unidades de temperatura).
*   **Directivas:** 
    *   `v-for` para renderizar tarjetas de planetas.
    *   `v-if`/`v-show` para condicionar vistas (ej. Si hay 0 resultados en la búsqueda).
    *   `v-model` para enlazado de input de búsqueda bidireccional.
*   **Interpolación (`{{ }}`):** Para mostrar los datos y variables inyectadas.
*   **Sistema de Eventos (`@click`):** Botones de regreso manuales, enlaces y cambio de unidades térmicas.

## 🔗 Repositorio
[Agrega aquí tu enlace de GitHub si lo subes a un repositorio remoto]
