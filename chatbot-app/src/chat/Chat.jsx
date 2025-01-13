import React from 'react'
import Header from './components/header/Header'
import Conversation from './components/conversation/Conversation'
import useConversationStore from '../stores/conversation.store'

function Chat() {

    const scrollRef = React.useRef()

    React.useEffect(() => {
        // Any changes to the conversation will scroll to the bottom
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
    , [useConversationStore(state => state.messages)])

    return (
        <div className='w-full h-full max-h-full flex flex-col relative justify-center content-center overflow-y-auto' ref={scrollRef}>

            <Header />

            <Conversation/>


        </div>
    )
}

export default Chat
