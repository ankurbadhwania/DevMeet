
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center bg-base-300 p-4 rounded-lg w-1/2 mx-auto my-4 shadow"
          >
            
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={photoUrl}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left mx-4 flex-grow">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm opacity-80">{age + ", " + gender}</p>
              )}
              <p className="text-sm opacity-70">{about}</p>
            </div>

            
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg font-semibold 
                text-white bg-red-500 hover:bg-red-600 active:bg-red-700
                shadow-md hover:shadow-lg transition"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>

              <button
                className="px-4 py-2 rounded-lg font-semibold 
                text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                shadow-md hover:shadow-lg transition"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;













