import { NavLink } from "./react-router-dom";

export const NavBar = ({ user, logout }) => {
  if (!user) {
    return (
      <div className="page-header">
        <div class="logo">
          <p>BUQ</p>
        </div>
        <div className="header-right">
          <NavLink to="/auth">
          <button>Log ind</button>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="page-header">
      <div className="logo">
        <p>BUQ</p>
      </div>

      <button id="menu-icon" className="menu-icon black" onclick="onMenuClick()">
        <i class="fa fa-bars"></i>
      </button>

      <div id="navigation-bar" className="nav-bar">
        <NavLink to="/">Hjem</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
        <NavLink to="/settings">Indstillinger</NavLink>
      </div>

      <div className="header-right">
        <NavLink to="/auth">
          <button className="black" onClick={logout}>
            Log ud
          </button>
        </NavLink>
      </div>
    </div>
  );
};
