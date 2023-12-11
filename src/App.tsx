import './App.css';
import '@elastic/eui/dist/eui_theme_light.css'
import '@elastic/eui/dist/eui_theme_dark.css'

import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'
import { Route, Routes } from 'react-router-dom';
import { Login } from './app/pages/Login';
import { Dashboard } from './app/pages/Dashboard';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { CreateMeeting } from './app/pages/CreateMeeting';
import { OneOnOneMeeting } from './app/pages/OneOnOneMeeting';
import { setToasts } from './app/slices/MeetingSlice';
import { VideoConference } from './app/pages/VideoConference';
import { MyMeetings } from './app/pages/MyMeetings';
import { Meetings } from './app/pages/Meetings';
import { JoinMeeting } from './app/pages/JoinMeeting';

function App() {
  const dispatch = useAppDispatch()

  const toasts = useAppSelector(zoom => zoom.meetings.toasts)
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme)
  const [theme, setTheme] = useState<EuiThemeColorMode>('DARK')
  const [isInitialTheme, setIsInitialTheme] = useState(true)

  useEffect(() => {
    const theme = localStorage.getItem('zoom-theme')
    if (theme) {
      setTheme(theme as EuiThemeColorMode)
    } else {
      localStorage.setItem('zoom-theme', 'DARK')
    }
  }, [])

  useEffect(() => {
    if (isInitialTheme) setIsInitialTheme(false)
    else {
      window.location.reload()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme])

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
        <Routes >
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreateMeeting />} />
          <Route path='/create1on1' element={<OneOnOneMeeting />} />
          <Route path='/createvideoconference' element={<VideoConference />} />
          <Route path='/mymeetings' element={<MyMeetings />} />
          <Route path='/meetings' element={<Meetings />} />
          <Route path='/join/:id' element={<JoinMeeting />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Dashboard/>} />
        </Routes>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={5000}
        />
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;
