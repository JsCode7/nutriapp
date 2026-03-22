import type { ReactNode } from 'react'
import { Navbar } from './Navbar.tsx'

interface LayoutProps {
  children: ReactNode
  currentView: string
  onNavigate: (view: string) => void
}

export const Layout = ({ children, currentView, onNavigate }: LayoutProps) => {
  return (
    <div className="layout">
      <main className="content">
        {children}
      </main>
      <Navbar currentView={currentView} onNavigate={onNavigate} />
      
      <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .content {
          flex: 1;
          padding: 1.5rem;
          padding-bottom: 7rem; /* Space for bottom nav */
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
