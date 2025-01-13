import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function LoadingSpinner(props) {
    return (

        <AiOutlineLoading color={props.color ?? 'white'} size={props.size ?? 15} className='animate-spin'/>

    )
}

export default LoadingSpinner
