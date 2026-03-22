import { Activity, History, Settings, LayoutDashboard } from 'lucide-react'

interface NavbarProps {
  currentView: string
  onNavigate: (view: string) => void
}

export const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'log', icon: Activity, label: 'Registro' },
    { id: 'history', icon: History, label: 'Historial' },
    { id: 'settings', icon: Settings, label: 'Ajustes' },
  ]

  return (
    <nav className="bottom-nav glass-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <item.icon size={22} strokeWidth={currentView === item.id ? 2.5 : 2} />
        </button>
      ))}

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 3rem);
          max-width: 600px;
          height: 4.5rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 1rem;
          z-index: 100;
        }
        .nav-item {
          background: none;
          border: none;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-item.active {
          color: white;
          transform: scale(1.1);
        }
        .nav-item:hover {
          color: white;
        }
      `}</style>
    </nav>
  )
}
