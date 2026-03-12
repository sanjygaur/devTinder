import React from 'react'

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-blue-700 h-12 px-4">

        {/* Left side */}
        <div className="flex-1">
          <a className="btn btn-ghost text-lg h-8 min-h-0 px-2">
            daisyUI
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 fixed right-0">
          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar btn-sm"
            >
              <div className="w-8 rounded-full">
                <img
                  alt="profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  )
}

export default NavBar
