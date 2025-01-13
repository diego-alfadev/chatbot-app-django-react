import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useConversationStore from './conversation.store';


const initialState = {
    user: null,
    token: null,
    messages: [],
    currentChat: null,
    chatsHistory: []
}

const useAppStore = create(
    persist(
        (set, get) => ({
            ...initialState,
            login: (user, token) => {
                set({ user, token })
            },
            logout: () => {
                set(initialState)
                useConversationStore.getState().reset()
            },
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            setMessages: (messages) => set({ messages }),
            setCurrentChat: (currentChat) => set({ currentChat }),
            setChatsHistory: (chatsHistory) => set({ chatsHistory }),
            addChatToHistory: (chat) => set({ chatsHistory: [...get().chatsHistory, chat] }),
            reset: () => set({ ...initialState })
        }), {
        name: 'app-store',
        storage: createJSONStorage(() => localStorage),
    }))

export default useAppStore;

