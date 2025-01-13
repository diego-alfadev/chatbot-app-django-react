import React from 'react'
import useAppStore from '../../../stores/app.store'
import { useSidebarStore } from '../../../sidebar/SideBar'
import { BiSidebar } from 'react-icons/bi'
import { RiChatNewLine } from 'react-icons/ri'
import useConversationStore from '../../../stores/conversation.store'

function Header() {

    const user = useAppStore(state => state.user)

    const { sidebarOpen, setSidebarOpen } = useSidebarStore()

    return (
        <div className='flex flex-row justify-between px-4 items-center py-4 sticky -top-1 bg-neutral-800 z-10'>
            <div className='flex flex-row items-center'>
                {!sidebarOpen && <div className='flex items-center justify-between mr-4'>
                    <button className='rounded-xl hover:bg-white/10 p-2' onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <BiSidebar color='rgba(255,255,255,.6)' size={25} />
                    </button>
                    <button className='rounded-xl hover:bg-white/10 p-2' onClick={() => useConversationStore.getState().reset()}>
                        <RiChatNewLine color='rgba(255,255,255,.6)' size={25} />
                    </button>
                </div>}
                <h2 className='text-white text-xl font-bold'>Clintell Bot</h2>
            </div>
            {
                user ?
                    <div className='flex flex-row items-center'>
                        <p className='text-zinc-400 mr-4'>{user.email}</p>
                        <div className='h-10 w-10 flex items-center justify-center bg-blue-400 rounded-full text-center'>
                        <p className="font-bold capitalize text-blue-950 text-xl">{useAppStore.getState().user.username.split(' ').slice(0,2).map(w => w[0]).join().toUpperCase()}</p>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Header
