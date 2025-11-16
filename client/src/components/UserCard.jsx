
import axios from "axios";
import { useDispatch } from "react-redux";
import BASE_URL from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const dispatch = useDispatch();

  const [showRequestSentToast, setShowRequestSentToast] = useState(false);
  const [toastName, setToastName] = useState("");
  const [swipeDirection, setSwipeDirection] = useState("");

  const handleSendRequest = async (status, userId) => {
    try {
      if (status === "interested") setSwipeDirection("swipe-right");
      else setSwipeDirection("swipe-left");

      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

       if(status === "interested"){
        setToastName(firstName);
        setSwipeDirection("swipe-right");
        setShowRequestSentToast(true);
      }

      setTimeout(() => {
        setShowRequestSentToast(false);
      }, 1500);

      setTimeout(() => {
        setSwipeDirection("");
        dispatch(removeFeed(userId));
      }, 100);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-5">
      
      <div className={`card bg-base-300 w-96 shadow-xl ${swipeDirection}`}>
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
        </div>
      </div>

      {showRequestSentToast && (
        <div className="toast toast-center toast-top">
          <div className="alert alert-info">
            <span>Request sent to {toastName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;














// import axios from "axios";
// import { useDispatch } from "react-redux";
// import BASE_URL from "../utils/constants";
// import { removeFeed } from "../utils/feedSlice";
// import { useState } from "react";

// const UserCard = ({ user }) => {
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
//   const dispatch = useDispatch();
//   const [showRequestSentToast, setShowRequestSentToast] = useState(false)
//   const [toastName, setToastName] = useState("");
//   const [swipeDirection, setSwipeDirection] = useState(""); 


//   const handleSendRequest = async (status, userId) => {
//     try {
//       await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
      
//       if(status === "interested"){
//         setToastName(firstName);
//         setSwipeDirection("swipe-right");
//         setShowRequestSentToast(true);
//       }
//       else{
//         setSwipeDirection("swipe-left");
//       }

//       setTimeout(() => {
//         setShowRequestSentToast(false);
//       }, 1500);
      
//     setTimeout(() => {
//       dispatch(removeFeed(userId));
//     }, 50); 

//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   return (
//     <div className="flex justify-center my-5">
//       <div className="card bg-base-300 w-96 shadow-xl">
//         <figure>
//           <img src={photoUrl} alt="photo" />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{firstName + " " + lastName}</h2>
//           {age && gender && <p>{age + ", " + gender}</p>}
//           <p>{about}</p>

//           <div className="card-actions justify-center my-4">
//             <button
//               className="px-4 py-2 rounded-lg font-semibold text-[16px]
//  text-white bg-red-500 hover:bg-red-600 active:bg-red-700
//  shadow-md hover:shadow-lg transition"
//               onClick={() => handleSendRequest("ignored", _id)}
//             >
//               Ignore
//             </button>

//             <button
//               className="px-4 py-2 rounded-lg font-semibold text-[16px]
//  text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700
//  shadow-md hover:shadow-lg transition"
//               onClick={() => handleSendRequest("interested", _id)}
//             >
//               Interested
//             </button>
//           </div>
//         </div>
//       </div>
//       {showRequestSentToast && <div>
//         <div className="toast toast-center toast-top">
//         <div className="alert alert-info">
//           <span>Request sent to {toastName}</span>
//         </div>
//       </div>
//       </div>}
//     </div>
//   );
// };
// export default UserCard;






