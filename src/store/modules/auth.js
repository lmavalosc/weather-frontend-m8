import { authLogin, authRegister } from '../../data/usersMock'

// Recuperar sesión persistida en localStorage de forma segura
let storedUser = null
try {
    const saved = localStorage.getItem('clima_user')
    if (saved) {
        storedUser = JSON.parse(saved)
    }
} catch (e) {
    console.error('Error parseando sesión de localStorage', e)
    localStorage.removeItem('clima_user')
}

const state = {
    currentUser: storedUser,    // Objeto usuario o null
    isAuthenticated: !!storedUser,
    loading: false,
    error: null
}

const getters = {
    currentUser: state => state.currentUser,
    isAuthenticated: state => state.isAuthenticated,
    authLoading: state => state.loading,
    authError: state => state.error,
    // Preferencias del usuario actual (o defaults)
    preferencias: state => state.currentUser?.preferencias ?? { unidad: 'C', tema: 'dark' },
    // Favoritos del usuario actual
    favoritos: state => state.currentUser?.favoritos ?? []
}

const mutations = {
    SET_LOADING(state, value) {
        state.loading = value
    },
    SET_ERROR(state, message) {
        state.error = message
    },
    CLEAR_ERROR(state) {
        state.error = null
    },
    LOGIN_SUCCESS(state, user) {
        state.currentUser = user
        state.isAuthenticated = true
        state.loading = false
        state.error = null
    },
    LOGOUT(state) {
        state.currentUser = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
    },
    UPDATE_PREFERENCIAS(state, preferencias) {
        if (state.currentUser) {
            state.currentUser = {
                ...state.currentUser,
                preferencias: { ...state.currentUser.preferencias, ...preferencias }
            }
        }
    },
    TOGGLE_FAVORITO(state, cityId) {
        if (!state.currentUser) return
        const favoritos = [...(state.currentUser.favoritos || [])]
        const idx = favoritos.indexOf(cityId)
        if (idx === -1) {
            favoritos.push(cityId)
        } else {
            favoritos.splice(idx, 1)
        }
        state.currentUser = { ...state.currentUser, favoritos }
    }
}

const actions = {
    async login({ commit }, { email, password }) {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        try {
            const user = await authLogin(email, password)
            commit('LOGIN_SUCCESS', user)
            localStorage.setItem('clima_user', JSON.stringify(user))
            return user
        } catch (err) {
            commit('SET_LOADING', false)
            commit('SET_ERROR', err.message)
            throw err
        }
    },

    async register({ commit }, { nombre, email, password }) {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        try {
            const user = await authRegister(nombre, email, password)
            commit('LOGIN_SUCCESS', user)
            localStorage.setItem('clima_user', JSON.stringify(user))
            return user
        } catch (err) {
            commit('SET_LOADING', false)
            commit('SET_ERROR', err.message)
            throw err
        }
    },

    logout({ commit }) {
        commit('LOGOUT')
        localStorage.removeItem('clima_user')
    },

    actualizarPreferencias({ commit, state }, preferencias) {
        commit('UPDATE_PREFERENCIAS', preferencias)
        if (state.currentUser) {
            localStorage.setItem('clima_user', JSON.stringify(state.currentUser))
        }
    },

    toggleFavorito({ commit, state }, cityId) {
        commit('TOGGLE_FAVORITO', cityId)
        if (state.currentUser) {
            localStorage.setItem('clima_user', JSON.stringify(state.currentUser))
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
