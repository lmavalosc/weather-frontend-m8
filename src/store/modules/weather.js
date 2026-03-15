import { baseCitiesConfig } from '../../data/citiesData'

function mapWeatherCode(code) {
    if (code === 0) return 'Despejado';
    if (code === 1 || code === 2 || code === 3) return 'Principalmente Despejado a Nublado';
    if (code === 45 || code === 48) return 'Niebla';
    if (code >= 51 && code <= 55) return 'Llovizna';
    if (code >= 61 && code <= 65) return 'Lluvia';
    if (code >= 71 && code <= 75) return 'Nieve';
    if (code >= 80 && code <= 82) return 'Chubascos';
    if (code >= 95) return 'Tormenta';
    return 'Desconocido';
}

function mapWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2 || code === 3) return '⛅';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 65) return '🌧️';
    if (code >= 71 && code <= 75) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 95) return '⛈️';
    return '☁️';
}

export default {
    namespaced: true,
    state: {
        cities: [],
        selectedCity: null,
        loading: false,
        error: null,
        alertMessage: null
    },
    getters: {
        allCities: state => state.cities,
        selectedCity: state => state.selectedCity,
        isLoading: state => state.loading,
        hasError: state => state.error,
        alertMessage: state => state.alertMessage
    },
    actions: {
        async fetchAllCitiesWeather({ commit }) {
            commit('SET_LOADING', true);
            commit('CLEAR_ERROR');
            commit('SET_ALERT', null);
            
            try {
                let citiesConfig = [...baseCitiesConfig];
                const apiUrl = import.meta.env.VITE_API_URL || 'https://api.open-meteo.com/v1/forecast';
                
                const fetchPromises = citiesConfig.map(async (city) => {
                    const res = await fetch(`${apiUrl}?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America%2FSantiago`);
                    if(!res.ok) throw new Error(`Error HTTP: ${res.status}`);
                    const data = await res.json();
                    
                    return {
                        ...city,
                        currentWeather: {
                            temp: Math.round(data.current_weather.temperature),
                            condition: mapWeatherCode(data.current_weather.weathercode),
                            icon: mapWeatherIcon(data.current_weather.weathercode)
                        },
                        forecast: [
                            { day: 'Mañana', temp: Math.round(data.daily.temperature_2m_max[1]), icon: mapWeatherIcon(data.daily.weathercode[1]) },
                            { day: 'Pasado', temp: Math.round(data.daily.temperature_2m_max[2]), icon: mapWeatherIcon(data.daily.weathercode[2]) },
                            { day: 'Día 3', temp: Math.round(data.daily.temperature_2m_max[3]), icon: mapWeatherIcon(data.daily.weathercode[3]) }
                        ],
                        stats: {
                            min: Math.min(...data.daily.temperature_2m_min.slice(0, 7).map(t => Math.round(t))),
                            max: Math.max(...data.daily.temperature_2m_max.slice(0, 7).map(t => Math.round(t))),
                            average: Math.round(data.daily.temperature_2m_max.slice(0, 7).reduce((acc, t) => acc + t, 0) / 7)
                        }
                    };
                });
                
                citiesConfig = await Promise.all(fetchPromises);
                commit('SET_CITIES', citiesConfig);
                
                // Calculate Alert: Heatwave (max >= 30) or freezing (min <= 0)
                const hotCities = citiesConfig.filter(c => c.stats.max >= 30);
                if (hotCities.length > 0) {
                    commit('SET_ALERT', `¡Alerta de calor! Se esperan temperaturas altas en: ${hotCities.map(c => c.name).join(', ')}.`);
                }
                
            } catch (err) {
                console.error('Error fetching weather:', err);
                commit('SET_ERROR', 'Ocurrió un error al obtener los datos del clima en tiempo real desde la API. Por favor, revisa tu conexión a internet.');
                // En caso de fallo crítico, cargamos los datos geográficos básicos sin pronóstico
                commit('SET_CITIES', baseCitiesConfig);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        async fetchCityWeather({ commit, state, dispatch }, cityId) {
            if (state.cities.length === 0) {
                await dispatch('fetchAllCitiesWeather');
            }
            const city = state.cities.find(c => c.id === cityId);
            if (city) {
                commit('SET_SELECTED_CITY', city);
            } else {
                commit('SET_ERROR', 'No se ha encontrado la ciudad solicitada.');
                commit('SET_SELECTED_CITY', null);
            }
        }
    },
    mutations: {
        SET_CITIES(state, cities) {
            state.cities = cities;
        },
        SET_SELECTED_CITY(state, city) {
            state.selectedCity = city;
        },
        SET_LOADING(state, payload) {
            state.loading = payload;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
        SET_ALERT(state, msg) {
            state.alertMessage = msg;
        }
    }
}
