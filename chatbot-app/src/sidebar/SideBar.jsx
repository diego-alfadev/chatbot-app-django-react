import React from 'react'
import UserWelcome from './components/UserWelcome'
import useAppStore from '../stores/app.store'

import { BiSidebar } from 'react-icons/bi'
import { RiChatNewLine } from 'react-icons/ri'
import ChatHistory from './components/ChatHistory'
import { create } from 'zustand'
import useConversationStore from '../stores/conversation.store'

export const useSidebarStore = create(set => ({
  sidebarOpen: true,
  setSidebarOpen: (value) => set({ sidebarOpen: value })
}))



function SideBar(props) {

  const sidebarClass = {
    open: 'w-1/4',
    close: 'hidden'
  }
  const { sidebarOpen, setSidebarOpen } = useSidebarStore()

  return (
    <div className={`${sidebarOpen ? sidebarClass.open : sidebarClass.close} h-full flex flex-col flex-wrap bg-neutral-900 p-4`}>
      <div className='flex items-center justify-between mb-4'>
        <button className='rounded-xl hover:bg-white/10 p-2' onClick={() => setSidebarOpen(!sidebarOpen)}>
          <BiSidebar color='rgba(255,255,255,.6)' size={25} />
        </button>
        <button className='rounded-xl hover:bg-white/10 p-2' onClick={() => useConversationStore.getState().reset()}>
          <RiChatNewLine color='rgba(255,255,255,.6)' size={25} />
        </button>
      </div>

      <div className='flex items-center '>
        <UserWelcome />
      </div>
      <div className='flex-grow flex'>

        <ChatHistory />

      </div>
      <button className='border w-full mb-4 border-white/40 hover:bg-white/10 rounded-lg text-white px-4 py-2' onClick={() => useAppStore.getState().logout()}>Logout</button>
    </div>
  )
}

export default SideBar
