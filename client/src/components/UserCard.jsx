import axios from "axios";
import { useDispatch } from "react-redux";
import BASE_URL from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>

          <div className="card-actions justify-center my-4">
            <button
              className="px-4 py-2 rounded-lg font-semibold text-[16px]
 text-white bg-red-500 hover:bg-red-600 active:bg-red-700
 shadow-md hover:shadow-lg transition"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="px-4 py-2 rounded-lg font-semibold text-[16px]
 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700
 shadow-md hover:shadow-lg transition"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>

          {/* <div className="card-actions justify-center my-4">
        <button className="btn btn-secondary">
          Ignore
        </button>
        <button className="btn btn-primary">
          Interested
        </button>
      </div> */}
        </div>
      </div>
    </div>
  );
};
export default UserCard;







/////////////////////////////////////////////////////////////////

// const UserCard = ({user}) => {
//     const {firstName, lastName, photoUrl, about, gender, age} = user;
//     console.log(user)
//   return (

//     <div className="flex justify-center my-10">
//     <div className="card w-80 bg-base-200 shadow-xl">
//       <figure className="relative overflow-hidden">
//         <img
//           src={photoUrl}
//           alt="userPhoto"
//           className="w-full h-40 object-cover"
//         />
//         <div className="absolute inset-0 bg-base-100/20 opacity-0 hover:opacity-100 transition duration-300"></div>
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{firstName + " " + lastName}</h2>
//         {age && gender && <p>{age + ", " + gender}</p>}
//         <p>{about}</p>
//         <div className="card-actions justify-center my-4">
//           <button className="px-4 py-2 rounded-lg font-semibold text-[16px]
// text-white bg-red-500 hover:bg-red-600 active:bg-red-700
// shadow-md hover:shadow-lg transition">Ignore</button>

//           <button className="px-4 py-2 rounded-lg font-semibold text-[16px]
// text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700
// shadow-md hover:shadow-lg transition">Interested</button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }
// export default UserCard;
