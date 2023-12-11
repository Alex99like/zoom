'use client'


import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { PropsWithChildren } from 'react'

export const ReduxProvider = ({ children }: PropsWithChildren) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}