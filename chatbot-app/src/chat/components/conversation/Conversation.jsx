import React from 'react'
import useConversationStore from '../../../stores/conversation.store'
import ChatMessage from '../messages/message'
import useAppStore from '../../../stores/app.store'
import SignInModal from '../../../sign-in/SignInModal'

function Conversation() {

    const buttons = [
        {
            text: '¿Quién eres?',
            action: () => startChat('Quién eres?')
        },
        {
            text: '¿Qué haces?',
            action: () => startChat('Qué haces?')
        },
        {
            text: '¿Quién es tu creador?',
            action: () => startChat('¿Quién es tu creador?')
        },
        {
            text: '¿Qué es "Clintell"?',
            action: () => startChat('¿Qué es "Clintell"?')
        },
    ]

    const {chat, messages} = useConversationStore()
    const [textMessage, setTextMessage] = React.useState('')
    const [showModal, setShowModal] = React.useState(false)
    const [thinking, setThinking] = React.useState(false)
    const inputRef = React.useRef()

    async function startChat(textMessage, ev) {


        if (!useAppStore.getState().token) {
            alert('You need to sign in first')
            setShowModal(true)
            ev?.preventDefault()
            return
        }


        setTextMessage('')
        setThinking(true)
        await useConversationStore.getState().startChat(textMessage)
        setThinking(false)

    }

    async function sendMessage(textMessage, ev) {

        if (!useAppStore.getState().token) {
            setShowModal(true)
            ev?.preventDefault()
            return
        }

        setTextMessage('')
        setThinking(true)
        await useConversationStore.getState().sendMessage(textMessage)
        setThinking(false)

    }

    React.useEffect(() => {
        console.log('messages', messages)
        inputRef.current.focus()
    }, [messages])

    React.useEffect(() => {
        inputRef.current.focus()
    }, [])


    if (!chat) return (
        <>
        {showModal && <SignInModal onModalClose={() => setShowModal(false)} />}
            <div className='flex flex-1 flex-col justify-center'>

                <h2 className='text-white text-3xl text-center font-bold'>¿En qué puedo ayudarte?</h2>

                <div className='bg-neutral-600 p-4 rounded-2xl w-4/5 md:w-2/3 lg:w-3/5 mx-auto mt-10'>
                    <textarea
                        ref={inputRef}
                        value={textMessage}
                        disabled={thinking}
                        onChange={(e) => setTextMessage(e.target.value)}
                        onKeyDown={(e) => {

                            // If both the 'Enter' key is pressed and the 'Shift' key is pressed, then do nothing
                            if (e.key === 'Enter' && e.shiftKey) return

                            if (e.key === 'Enter') {
                                startChat(textMessage, e)
                            }
                        }}
                        className='w-full bg-transparent text-white p-2 focus:border-0 focus:outline-none'
                        placeholder='Type a message...'
                        type='text'
                    />
                </div>
                <div className="grid grid-cols-4 gap-2 w-4/5 md:w-2/3 lg:w-3/5 mx-auto mt-5 ">

                    {
                        buttons.map((b) =>
                            <button
                                key={b.text}
                                className="border border-neutral-500 text-sm text-bold text-neutral-400 p-2 rounded-xl hover:bg-neutral-400/10 hover:shadow-sm "
                                onClick={b.action}
                            >{b.text}</button>)
                    }

                </div>

            </div>
        </>

    )

    return (
        <>
            {showModal && <SignInModal onModalClose={() => setShowModal(false)} />}
            <div className='flex h-full flex-col mt-15'>



                        <div className=' flex-grow w-4/5 mx-auto pt-10 pb-10 '>

                            {
                                messages.map((message, index) => <ChatMessage key={index} message={message} />)
                            }

                        </div>



                <div className="sticky bottom-0 bg-neutral-800 pb-5">

                    <div className=' bg-neutral-600 p-4 rounded-3xl w-4/5 mx-auto'>
                        <textarea
                            ref={inputRef}
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            onKeyDown={(e) => {
                                // If both the 'Enter' key is pressed and the 'Shift' key is pressed, then do nothing
                                if (e.key === 'Enter' && e.shiftKey) return

                                if (e.key === 'Enter') {
                                    sendMessage(textMessage, e)
                                }
                            }}
                            className='w-full bg-transparent text-white p-2 focus:border-0 focus:outline-none'
                            placeholder='Type a message...'
                            disabled={thinking}
                            type='text'
                        />
                    </div>
                    <p className='text-neutral-300 text-xs font-semibold text-center mt-5'>Este chatbot está recién nacido y no debería usarse para fines de estudio.</p>
                </div>



            </div>
        </>
    )
}

export default Conversation
