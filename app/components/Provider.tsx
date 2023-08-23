'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Provider
