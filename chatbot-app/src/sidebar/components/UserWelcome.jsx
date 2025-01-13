import React from 'react'
import useAppStore from '../../stores/app.store'
import SignInModal from '../../sign-in/SignInModal'

function UserWelcome() {

    const user = useAppStore(state => state.user)

    const [singInModalOpen, setSignInModalOpen] = React.useState(false)

    return (
        <>
            {user ? (
                <p className='text-sm text-neutral-400'>Welcome <b>{user.username}</b>!</p>
            ) :
                <div className='w-4/5 h-full'>
                    <div className='flex items-center justify-center h-16'>
                        <button className='border border-white/40 hover:bg-white/10 rounded-lg w-full px-4 py-2 text-white' onClick={() => setSignInModalOpen(true)}>Sign In</button>
                    </div>
                </div>
            }
            {singInModalOpen && <SignInModal onModalClose={() => setSignInModalOpen(false)} />}
        </>
    )
}

export default UserWelcome
