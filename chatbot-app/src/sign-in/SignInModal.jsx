import React from 'react'
import ReactDom from 'react-dom'
import { AuthService } from '../services/auth.service'
import useAppStore from '../stores/app.store'

function SignInModal(props) {

    const [mode, setMode] = React.useState('sign-in')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [errors, setErrors] = React.useState([])

    const refs = {
        username: React.useRef(),
        email: React.useRef(),
        password: React.useRef(),
        confirmPassword: React.useRef()
    }

    const onSubmit = async () => {

        setErrors([])

        if (mode === 'sign-in') {

            if (!username || !password) {
                setErrors((errors) => [...errors, 'Username and password are required'])
                return
            }

            try {
                const response = await AuthService.login(username, password)
                const { user, token } = response
                useAppStore.getState().login(user, token)
                props.onModalClose?.()
            } catch (error) {
                setErrors((errors) => [...errors, error.message])
            }

        } else {

            if (!username || !email || !password || !confirmPassword) {
                setErrors((errors) => [...errors, 'All fields are required'])
                return
            }

            if (password !== confirmPassword) {
                setErrors((errors) => [...errors, 'Passwords do not match'])
                return
            }

            try {
                const response = await AuthService.register({ username, email, password })
                const { user, token } = response
                useAppStore.getState().login(user, token)
                props.onModalClose?.()

            } catch (error) {
                setErrors((errors) => [...errors, error.message])
            }
        }
    }


    return ReactDom.createPortal(
        <div className='z-40 animate-fade-in fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center' onClick={() => props.onModalClose?.()}>
            <div className='z-50 bg-zinc-800 py-10 px-20 rounded-lg' onClick={(e) => e.stopPropagation()}>
                <h1 className='text-3xl text-center mt-10'>Clintell Bot</h1>
                <p className='prose text-center mb-8'>{mode === 'sign-in' ? 'Sign in to your account' : 'Create a new account'}</p>
                <input
                    ref={refs.username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(ev) => ev.key === 'Enter' ? refs.email.current.focus() : null}
                    className='border border-white/30 bg-white/10 text-white w-full px-4 py-2 rounded-lg' placeholder='Username' />
                {mode == 'sign-up' ?
                    <input
                        ref={refs.email}
                        onKeyDown={(ev) => ev.key === 'Enter' ? refs.password.current.focus() : null}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-white/30 bg-white/10 text-white w-full px-4 py-2 rounded-lg mt-4' placeholder='Email' /> : null}
                <input
                    value={password}
                    ref={refs.password}
                    onKeyDown={(ev) => ev.key === 'Enter' ? mode === 'sign-in' ? onSubmit() : refs.confirmPassword.current.focus() : null}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-white/30 bg-white/10 text-white w-full px-4 py-2 rounded-lg mt-4' placeholder='Password' type='password' />
                {mode == 'sign-up' ?
                    <input
                        value={confirmPassword}
                        ref={refs.confirmPassword}
                        onKeyDown={(ev) => ev.key === 'Enter' ? onSubmit() : null}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border border-white/30 bg-white/10 text-white w-full px-4 py-2 rounded-lg mt-4' placeholder='Repeat password' type='password' /> : null}

                <button
                    onClick={onSubmit}
                    className=' w-full px-4 py-2 rounded-lg mt-8 text-white bg-zinc-900 hover:bg-white/20'>{mode == 'sign-in' ? 'Sign in' : 'Sign Up'}</button>

                {errors && errors.length > 0 &&
                    <div className='flex items-center justify-center mt-4'>
                        <ul className='text-red-500'>
                            {errors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div>}


                <div className="w-full grid grid-cols-2 gap-4">
                    <button
                        className='border border-white/50  px-4 py-2 rounded-lg mt-4 bg-white hover:bg-white/80 hover:border-zinc-900 '
                        onClick={() => mode == 'sign-in' ? setMode('sign-up') : setMode('sign-in')}>
                        {mode == 'sign-in' ? 'Create an account' : 'Sign in to your account'} </button>
                    <button
                        className='border border-white/50  px-4 py-2 rounded-lg mt-4 text-white hover:bg-white/10'
                        onClick={() => props.onModalClose?.()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('root-modal')
    )
}

export default SignInModal
