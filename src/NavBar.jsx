import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="navbar bg-base-100 shadow-sm px-6">

      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>

      <div className="navbar-center">

      </div>

      <div className="navbar-end">
        {user && (
          <div className="dropdown dropdown-end mx-5 flex">
            <p className="px-4 items-center">Welcome, {user.firstName}!</p>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="avatar">
                <div className="w-8 rounded">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
            </label>

            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
};

export default NavBar;