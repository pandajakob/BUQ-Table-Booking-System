import { NavLink } from "react-router-dom";

export const NavBar = ({ user, logout }) => {
  return (
    <nav id="header" className="flex">
      <NavLink to="/">
        <h3 id="logoTitle"> BUQ </h3>
      </NavLink>

      {user ? (
        <ul className="flex">
          <li>
            <NavLink className="button white" to="/bookings">
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink className="button white" to="/settings">
              indstillinger
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth">
              <button className="button red" onClick={logout}>
                {" "}
                Log ud
              </button>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="flex">
          <li>
            <NavLink to="/auth">
              <p className="button blue">Log ind</p>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
