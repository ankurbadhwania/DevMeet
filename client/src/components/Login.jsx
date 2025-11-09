import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mark3@gmail.com");
  const [password, setPassword] = useState("mark@3AA");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } 
    catch(err) {
      setError(err?.response?.data || "something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs  border p-4">
        <label className="label">Email </label>
        <input
          type="text"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="text"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 font-semibold">{error}</p>  
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
