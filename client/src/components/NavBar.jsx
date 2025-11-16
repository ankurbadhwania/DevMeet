import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await axios.post(BASE_URL + "/logout", {},{
      withCredentials : true
    })
    dispatch(removeUser());
    navigate("/login")
  }

  return (
    <div className="navbar bg-base-100 shadow-sm relative ">
  <div className="flex-none">
    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻DevMeet</Link>
  </div>

  <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-20">
    <Link to="/profile" className="btn btn-ghost">Profile</Link>
    <Link to="/connection" className="btn btn-ghost">Connections</Link>
    <Link to="/requests" className="btn btn-ghost">Requests</Link>
  </div>

  {user && (
    <div className="flex items-center gap-4 ml-auto">
      <div className="form-control my-1.5">
        Welcome, {user.firstName}
      </div>

      <div className="dropdown dropdown-end mx-5">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="user photo" src={user.photoUrl} />
          </div>
        </div>

        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
        >
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/">Feed</Link></li>
          <li><Link to="/connection">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>

      </div>
    </div>
  )}
</div>

  );
};

export default NavBar;


