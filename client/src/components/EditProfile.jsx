import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const[showToast, setShowToast] = useState(false);
  const[error, setError] = useState();

  const dispatch = useDispatch();

  const saveProfile = async () => {

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setError("");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1500);
      
    } catch (err) {
      setError(err.response.data)
    }
  };
  return (
    <div className="flex justify-center my-6">
      <div className="flex justify-center mx-10">
        <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs  border p-4">
          <div className="card-title justify-center">Edit Profile</div>
          <label className="label">First Name </label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name </label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Photo Url</label>
          <input
            type="text"
            className="input"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label">Age </label>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender </label>

          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setGender(e.target.value)}
          >
            {/* <option value="">Select Gender</option> */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

          <label className="label">About</label>
          <textarea maxlength="252"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered w-full max-w-xs resize-none "
          ></textarea>
          {error}
          <button className="btn btn-neutral mt-4" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />

      {showToast && <div>
        <div className="toast toast-center toast-top">
        <div className="alert alert-info">
          <span>Profile saved successfully.</span>
        </div>
      </div>
      </div>}

      

    </div>
  );
};

export default EditProfile;
