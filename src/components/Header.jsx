import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <div className="header">
      <Link
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        Home
      </Link>
      <span> | </span>
      <Link
        to="/favs"
        className={location.pathname === '/favs' ? 'active' : ''}
      >
        Favorites
      </Link>
    </div>
  );
}
