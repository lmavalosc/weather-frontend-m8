// Usuarios simulados (mock) para autenticación sin backend
export const mockUsers = [
    {
        id: 1,
        nombre: 'Ana García',
        email: 'ana@clima.cl',
        password: '1234',
        avatar: '👩‍💼',
        preferencias: {
            unidad: 'C',   // 'C' = Celsius, 'F' = Fahrenheit
            tema: 'dark',  // 'dark' | 'light'
        },
        favoritos: ['santiago', 'valparaiso', 'puerto-montt']
    },
    {
        id: 2,
        nombre: 'Carlos Mendoza',
        email: 'carlos@clima.cl',
        password: 'abcd',
        avatar: '👨‍💻',
        preferencias: {
            unidad: 'F',
            tema: 'dark',
        },
        favoritos: ['arica', 'iquique', 'antofagasta']
    },
    {
        id: 3,
        nombre: 'Sofía Torres',
        email: 'sofia@clima.cl',
        password: 'pass123',
        avatar: '👩‍🔬',
        preferencias: {
            unidad: 'C',
            tema: 'light',
        },
        favoritos: ['temuco', 'valdivia', 'coyhaique', 'punta-arenas']
    }
]

/**
 * Simula llamada asíncrona a API de autenticación.
 * Retorna el usuario (sin contraseña) si las credenciales son correctas,
 * o lanza un error si son incorrectas.
 */
export function authLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            )
            if (user) {
                // Devolver copia sin la contraseña
                const { password: _, ...safeUser } = user
                resolve(safeUser)
            } else {
                reject(new Error('Usuario o contraseña incorrectos'))
            }
        }, 700) // Simula latencia de red
    })
}

/**
 * Simula registro de nuevo usuario.
 */
export function authRegister(nombre, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const emailExiste = mockUsers.some(
                u => u.email.toLowerCase() === email.toLowerCase()
            )
            if (emailExiste) {
                reject(new Error('El correo ya está registrado'))
                return
            }
            const nuevoUsuario = {
                id: mockUsers.length + 1,
                nombre,
                email,
                password,
                avatar: '🧑',
                preferencias: { unidad: 'C', tema: 'dark' },
                favoritos: []
            }
            mockUsers.push(nuevoUsuario)
            const { password: _, ...safeUser } = nuevoUsuario
            resolve(safeUser)
        }, 700)
    })
}
