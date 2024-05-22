import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './config/Router.tsx'
import './index.scss'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './config/keycloak.ts'
import { ThemeProvider } from '@emotion/react'
import theme from './config/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
      <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}/> 
        </ThemeProvider>
      </ReactKeycloakProvider>
  // </React.StrictMode>
)
