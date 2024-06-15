import React from "react";
import { setSelectedUser } from "../../Redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
const OtherUsers = ({ user }) => {
  const dispatch = useDispatch();
  const setSelectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  const { selectedUsers } = useSelector((store) => store.user);
  const {onlineUsers} =useSelector((store)=>store.user);
  console.log("selectedUsers", selectedUsers);
  const isOnline =onlineUsers?.includes(user._id);
  return (
    <>
      <div
        onClick={() => setSelectedUserHandler(user)}
        className={`${
          selectedUsers?._id === user?._id ? "bg-zinc-200" : ""
        }flex gap-2 items-center text-white hover:text-zinc-900 hover:bg-zinc-200  rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online":""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="" srcset="" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
        <div>
          <div className="flex justify-between gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
        </div>
        <div className="divider my-0 py-0 h-1"></div>
      </div>
    </>
  );
};

export default OtherUsers;
