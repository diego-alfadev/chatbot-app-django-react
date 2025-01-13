import React from 'react'
import dayjs from 'dayjs'
import { FaRobot } from "react-icons/fa";
import useAppStore from '../../../stores/app.store';


function ChatMessage(props) {
    return (
        <div className='flex flex-col p-2' key={props.message.id}>
            {
                props.message.sender === 'user' ? <UserMessage message={props.message} /> : <BotMessage message={props.message} />
            }
        </div>
    )
}


const UserMessage = (props) => {
    return (
        <div className='flex justify-end'>
            <div className='animate-fade-in flex flex-col items-end'>

                <div className='bg-neutral-600 text-white p-4 rounded-xl'>
                    {props.message.content}
                </div>
                <p className='text-xs text-neutral-500 mt-2'>{dayjs(props.message.timestamp).fromNow()} - {dayjs(props.message.timestamp).format('HH:mm')}</p>
            </div>
            <div className='flex items-start ml-2'>
                <div className='h-6 w-6 flex items-center justify-center bg-blue-400 rounded-full text-center'>
                    <p className="font-bold capitalize text-sm text-blue-950">{useAppStore.getState().user.username.split(' ').map(w => w[0]).join().toUpperCase()}</p>
                </div>
            </div>
        </div>
    )
}

const BotMessage = (props) => {
    return (
        <div className='flex justify-start'>
            <div className='flex items-start mr-2'>
                <FaRobot color="rgba(255,255,255,.6)" size={20} />
            </div>
            <div className='animate-fade-in flex flex-col items-start'>

                <div className='text-white'>
                    <p>{props.message.content}</p>
                </div>
                <p className='text-xs text-neutral-500 mt-2'>{dayjs(props.message.timestamp).fromNow()} - {dayjs(props.message.timestamp).format('HH:mm')}</p>
            </div>
        </div>
    )
}


export default ChatMessage
