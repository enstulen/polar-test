'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

const SignInButton = () => {
  const { data: session } = useSession()

  const buttonClick = () => {
    if (session) {
      signOut({ redirect: true, callbackUrl: '/' })
    } else {
      signIn()
    }
  }
  return (
    <>
      <button
        className='rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600'
        onClick={() => buttonClick()}
      >
        {session ? 'Sign out' : 'Sign in'}
      </button>
    </>
  )
}

export default SignInButton
