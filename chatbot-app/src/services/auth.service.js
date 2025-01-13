import { ENV } from "../config"

export class AuthService {

    static BASE_URL = ENV.API_HOST + ENV.API_BASE

    static async login(email, password) {
        const response = await fetch(`${AuthService.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password
            })
        })

        if (response.status === 200) {
            return response.json()
        } else if (response.status === 401) {
            throw new Error('Invalid credentials')
        } else {
            const response = await response.json()
            throw new Error(response?.message || 'Login failed')
        }
    }

    static async register(user) {

        const { email, password, username } = user

        const response = await fetch(`${AuthService.BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email,
                password
            })
        })

        if (response.status === 201) {
            return response.json()
        } else {
            const json = await response.json()
            const message = json?.message || Object.values(json)[0]?.[0]
            throw new Error(message || 'Registration failed')
        }
    }
}
