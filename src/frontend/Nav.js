import { Link, NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header className="site-header">
    <Link className="Logo" to="/dashboard">
      <span className="logo-mark">N</span>
      <span>Notes</span>
    </Link>
    <nav aria-label="Main navigation">
      <ul>
        <li><NavLink end className={({ isActive }) => isActive ? 'active-nav-link' : undefined} to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active-nav-link' : undefined} to="/notes">All Notes</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active-nav-link' : undefined} to="/home">New Note</NavLink></li>
        </ul>
    </nav>
    <Link className="profile-link" to="/login">Logout</Link>
    </header>
  );
}

export default Nav;