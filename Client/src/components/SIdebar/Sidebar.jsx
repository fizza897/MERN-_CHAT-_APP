import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUser from "../OtherUser/OtherUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers } from "../../Redux/userSlice/userSlice";
const Sidebar = () => {
  const [search,setSearch]=useState("");
  const {otherUsers} =useSelector(store=>store.user)
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
      console.log(res);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler=(e)=>{
    const conversationUser =otherUsers?.find((user)=>user?.fullName.toLowerCase().includes(search?.toLowerCase()));
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User not found")
    }
  }
  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col">
        <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
          <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
            className="input input-bordered rounded-md"
            placeholder="Search......"
          />
          <button type="submit" className="btn btn-md bg-zinc-700 text-white">
            <BiSearchAlt2 className="w-6 h-6 outline-none" />
          </button>
        </form>
        <div className="divider px-3"></div>
        <OtherUser />
        <div className="">
          <div className="mt-2">
            <button onClick={logoutHandler} className="btn btn-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
