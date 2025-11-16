import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email :emailId,
          password : password
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email :  emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs  border p-4">

          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
        { !isLoginForm && <><label className="label">First Name </label>
        <input
          type="text"
          className="input"
          placeholder="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name </label>
        <input
          type="text"
          className="input"
          placeholder="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        /> </>}

        <label className="label">Email </label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 font-semibold">{error}</p>  
        <button className="btn btn-neutral mt-4" onClick={isLoginForm ? handleLogin : handleSignUp}>
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
      </div>
      
    </div>
  );
};

export default Login;
