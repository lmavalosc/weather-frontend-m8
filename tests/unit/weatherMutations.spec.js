import weatherModule from '../../src/store/modules/weather'
import { describe, it, expect } from 'vitest'

describe('weather.js mutations', () => {
  it('SET_LOADING: debería actualizar el estado loading', () => {
    const state = { loading: false }
    weatherModule.mutations.SET_LOADING(state, true)
    expect(state.loading).toBe(true)
  })

  it('SET_ALERT: debería actualizar alertMessage', () => {
    const state = { alertMessage: null }
    weatherModule.mutations.SET_ALERT(state, 'Alerta de calor')
    expect(state.alertMessage).toBe('Alerta de calor')
  })

  it('SET_LAST_FETCH: debería actualizar el timestamp lastFetch', () => {
    const state = { lastFetch: null }
    const now = Date.now()
    weatherModule.mutations.SET_LAST_FETCH(state, now)
    expect(state.lastFetch).toBe(now)
  })
})
