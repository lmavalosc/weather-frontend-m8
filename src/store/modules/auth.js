import { authLogin, authRegister } from '../../data/usersMock'

// Recuperar sesión persistida en localStorage
const storedUser = localStorage.getItem('clima_user')
    ? JSON.parse(localStorage.getItem('clima_user'))
    : null

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
        // Persistir sesión en localStorage
        localStorage.setItem('clima_user', JSON.stringify(user))
    },
    LOGOUT(state) {
        state.currentUser = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
        localStorage.removeItem('clima_user')
    },
    UPDATE_PREFERENCIAS(state, preferencias) {
        if (state.currentUser) {
            state.currentUser = {
                ...state.currentUser,
                preferencias: { ...state.currentUser.preferencias, ...preferencias }
            }
            localStorage.setItem('clima_user', JSON.stringify(state.currentUser))
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
        localStorage.setItem('clima_user', JSON.stringify(state.currentUser))
    }
}

const actions = {
    async login({ commit }, { email, password }) {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')
        try {
            const user = await authLogin(email, password)
            commit('LOGIN_SUCCESS', user)
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
            return user
        } catch (err) {
            commit('SET_LOADING', false)
            commit('SET_ERROR', err.message)
            throw err
        }
    },

    logout({ commit }) {
        commit('LOGOUT')
    },

    actualizarPreferencias({ commit }, preferencias) {
        commit('UPDATE_PREFERENCIAS', preferencias)
    },

    toggleFavorito({ commit }, cityId) {
        commit('TOGGLE_FAVORITO', cityId)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
