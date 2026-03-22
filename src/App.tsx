import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/dashboard/Dashboard'
import { History } from './components/dashboard/History'
import { LogView } from './components/dashboard/LogView'
import { Settings } from './components/dashboard/Settings'
import './index.css'

function App() {
  const [view, setView] = useState('dashboard')

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard onNavigate={setView} />
      case 'history':
        return <History />
      case 'log':
        return <LogView />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard onNavigate={setView} />
    }
  }

  return (
    <Layout currentView={view} onNavigate={setView}>
      {renderView()}
    </Layout>
  )
}

export default App
