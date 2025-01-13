import React from 'react'
import useAppStore from '../../stores/app.store'
import { ChatService } from '../../services/chat.service'
import LoadingSpinner from '../../ui/LoadingSpinner'
import dayjs from 'dayjs'
import useConversationStore from '../../stores/conversation.store'


function ChatHistory() {
  // const user = null
  const user = useAppStore(state => state.user)
  const token = useAppStore(state => state.token)
  const [chatHistory, setChatHistory] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (user) {
      setLoading(true)
      ChatService.getChatHistory(token)
        .then(data => {
          setChatHistory(data.chats)
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }
  }, [user, token])


  if (!user) return null

  if (loading) return <LoadingSpinner color='white' size={20} />


  return (
    <div className='flex flex-grow flex-col mt-5'>
      <h2 className='mb-5 text-xs font-bold'>Latest Chats</h2>
      {
        (chatHistory.length === 0) ? <p className='text-xs text-neutral-300 text-center'>Nothing to show here yet</p> :
          <div className='flex-1 overflow-hidden'>
            <div className="h-full relative">
              <div className='h-full overflow-y-auto'>
                {chatHistory.map((chat, index) => (
                  <div key={index} className='flex flex-col p-2 hover:bg-neutral-600 rounded-lg mb-2 cursor-pointer' onClick={() => useConversationStore.getState().setChat(chat)}>
                    <p className='text-neutral-400 text-xs'>{dayjs().from(dayjs(chat.created_at), true)} ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
      }
    </div>
  )
}


export default ChatHistory
