import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const NavBar = () => {
  const user = useSelector((state) => state.user);
  console.log("redux user", user);
  return (
    <div className="navbar bg-base-300 ">

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>

      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

              <div className="w-8 rounded-full">
                <img
                  src={user.photoUrl}
                  alt="user photo"
                />

              </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/settings">Settings</Link>
              </li>

              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default NavBar;