import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { baseUrl } from "../Utils/constants";
import { removeUser } from "../Utils/userSlice";
const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("redux user", user);
  const handleLogOut = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true })
      dispatch(removeUser);
      return navigate("/login")
    } catch (error) {
      // error logic may be redirect to error page 
    }
  }
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
                <a>Settings</a>
              </li>

              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default NavBar;