'use client'

import '@elastic/eui/dist/eui_theme_light.css'
import '@elastic/eui/dist/eui_theme_dark.css'

import { PropsWithChildren, useState } from 'react'
import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setToasts } from '@/store/slices/MeetingSlice'

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [theme] = useState<EuiThemeColorMode>('DARK')
  const toasts = useAppSelector(zoom => zoom.meetings.toasts)
  const dispatch = useAppDispatch()

  const override = {
    colors: {
      LIGHT: { primary: '#0b5cff' },
      DARK: { primary: '#0b5cff' }
    }
  }

  const removeToast = (removeToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removeToast.id)
      )
    )
  }

  return (
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={override}>
        {children}
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={5000}
        />
      </EuiThemeProvider>
    </EuiProvider>
  )
}