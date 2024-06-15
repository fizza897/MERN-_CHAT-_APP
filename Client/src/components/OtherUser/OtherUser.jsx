import React from "react";
import OtherUsers from "../OtherUsers/OtherUsers";
import GetOtherUsers from "../../Hooks/GetOtherUsers/GetOtherUsers";
import { useSelector } from "react-redux";
const OtherUser = () => {
  // use custom hooks
  GetOtherUsers();
  const {otherUsers} =useSelector(store=>store.user)
  if(!otherUsers) return;
  return (
    <>
    <div className="overflow-auto">
      {otherUsers?.map((user)=>{
        return (
          <OtherUsers key={user._id} user={user}/>
        )
      })}
    </div>
    </>
  );
};

export default OtherUser;
