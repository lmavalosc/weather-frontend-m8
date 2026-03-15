import { createStore } from 'vuex'
import auth from './modules/auth'
import weather from './modules/weather'

export default createStore({
    modules: {
        auth,
        weather
    }
})
