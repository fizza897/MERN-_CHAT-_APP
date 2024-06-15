import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({message}) => {
  const scroll =useRef();
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
  const {authUser}=useSelector(store=>store.user);
  const {selectedUsers}=useSelector(store=>store.user);
  return (
    <>
      <div ref={scroll} className={`chat ${authUser?._id ===message?.senderId?"chat-end":"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message?.senderId === authUser?._id ?authUser?.profilePhoto:selectedUsers?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white">12:45</time>
        </div>
        <div className={`chat-bubble ${message?.senderId !== authUser?._id ? "bg-gray-200 text-black":"chat-start"}`}>{message?.message}</div>
      </div>
    </>
  );
};

export default SingleMessage;