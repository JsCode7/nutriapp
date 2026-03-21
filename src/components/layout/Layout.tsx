import type { ReactNode } from 'react'
import { Navbar } from './Navbar.tsx'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          background-color: var(--bg-dark);
        }
        .main-content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 640px) {
          .main-content {
            padding: 1rem;
            padding-bottom: 5rem; /* Space for bottom nav on mobile */
          }
        }
      `}</style>
    </div>
  )
}
