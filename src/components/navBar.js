import { NavLink } from "react-router-dom";

export const NavBar = ({ user, logout }) => {
  return (
    <nav id="header" className="flex">
      <h3> Buq.dk </h3>
      {user ? (
        <ul className="flex">
          <li>
            <NavLink className="button white" to="/bookings">
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink className="button white" to="/settings">
              settings
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
