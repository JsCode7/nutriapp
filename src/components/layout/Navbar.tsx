import { Home, LineChart, PlusCircle, Settings } from 'lucide-react'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand">Nutri App</div>
        <div className="nav-links">
          <button className="nav-btn active"><Home size={20} /> <span>Dashboard</span></button>
          <button className="nav-btn"><LineChart size={20} /> <span className="hide-mobile">History</span></button>
          <button className="nav-btn"><PlusCircle size={20} /> <span className="hide-mobile">Log</span></button>
          <button className="nav-btn"><Settings size={20} /> <span className="hide-mobile">Settings</span></button>
        </div>
      </div>
      <style>{`
        .navbar {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        .nav-links {
          display: flex;
          gap: 1rem;
        }
        .nav-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-btn:hover {
          color: var(--text-main);
          background-color: rgba(16, 185, 129, 0.1);
        }
        .nav-btn.active {
          color: var(--primary);
          background-color: rgba(16, 185, 129, 0.1);
        }
        @media (max-width: 640px) {
          .navbar {
            padding: 0.5rem;
            position: fixed;
            bottom: 0;
            top: auto;
            width: 100%;
            border-top: 1px solid var(--border);
            border-bottom: none;
          }
          .brand { display: none; }
          .nav-container { justify-content: center; }
          .nav-links { width: 100%; justify-content: space-around; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </nav>
  )
}
