import './App.css';
import '@elastic/eui/dist/eui_theme_light.css'
import { EuiProvider, EuiThemeProvider } from '@elastic/eui'
import { Route, Routes } from 'react-router-dom';
import { Login } from './app/pages/Login';
import { Dashboard } from './app/pages/Dashboard';

function App() {
  const override = {
    colors: {
      LIGHT: { primary: '#0b5cff' },
      DARK: { primary: '#0b5cff' }
    }
  }

  return (
    <EuiProvider colorMode='DARK'>
      <EuiThemeProvider modify={override}>
        <Routes >
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Dashboard/>} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;
