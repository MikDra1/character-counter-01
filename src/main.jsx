import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectProvider } from './contexts/ProjectProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
    <App />
    </ProjectProvider>
  </StrictMode>,
)
