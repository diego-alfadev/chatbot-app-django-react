import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import useAppStore from './app.store'
import { ChatService } from '../services/chat.service'

const initialState = {
    chat: null,
    messages: [],
}

const useConversationStore = create(
    persist(
        (set, get) => (
            {
                chat: initialState.chat,
                messages: initialState.messages,
                reset: () => set({ ...initialState }),
                setChat: (chat) => {
                    set({ chat })
                    ChatService.getChatMessages(useAppStore.getState().token, chat.id)
                        .then(data => {
                            set({ messages: data.chat.messages })
                        })
                        .catch(err => console.log(err))
                },
                setMessages: (messages) => set({ messages }),
                startChat: async (message_text) => {
                    const token = useAppStore.getState().token
                    const user_message = { content: message_text, sender: 'user', timestamp: new Date().getTime() }
                    set({ messages: [user_message] })
                    const response = await ChatService.startChat(token, message_text)

                    set({ chat: response.chat, messages: [user_message, response.response] })
                    useAppStore.getState().addChatToHistory(response.chat)
                },
                sendMessage: async (message) => {
                    const token = useAppStore.getState().token
                    const chat_id = get().chat.id
                    const user_message = { content: message, sender: 'user', timestamp: new Date().getTime(), chat: chat_id }

                    // Update the state with the new user message
                    set(state => ({ messages: [...state.messages, user_message] }))

                    const response = await ChatService.sendMessage(token, chat_id, message)

                    // Update the state with the chatbot response
                    set(state => ({ messages: [...state.messages, response.response] }))
                }
            }
        ), {
        name: 'conversation-store',
        storage: createJSONStorage(() => localStorage),
    }))

export default useConversationStore
