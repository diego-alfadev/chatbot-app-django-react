import { ENV } from '../config.js'

export class ChatService {
    static BASE_URL = ENV.API_HOST + ENV.API_BASE

    static async getChatHistory(token) {
        const response = await fetch(`${ChatService.BASE_URL}/history`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            },
        })

        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Failed to fetch chat history')
        }
    }

    static async getChatMessages(token, chat_id) {
        const response = await fetch(`${ChatService.BASE_URL}/${chat_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            },
        })


        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Failed to fetch chat messages')
        }

    }


    static async sendMessage(token, chat_id, message) {
        const response = await fetch(`${ChatService.BASE_URL}/${chat_id}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                message
            })

        })

        if (response.status === 201) {
            return response.json()
        } else {
            throw new Error('Failed to send message')
        }

    }

    static async startChat(token, message) {
        const response = await fetch(`${ChatService.BASE_URL}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                message
            })
        })

        if (response.status === 201) {
            return response.json()
        } else {
            throw new Error('Failed to start chat')
        }
    }

}
