import React from 'react'

function Header() {
    return (
        <div className='flex flex-1 flex-row-reverse px-4 items-center  h-16 border-2'>
            <div className='h-12 p-2 flex items-center bg-red-500 rounded-full text-center'>
                <p className='text-xs'>avatar</p>
            </div>
        </div>
    )
}

export default Header
