import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import axios from "axios"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../Redux/userSlice/userSlice";
const Regsiter = () => {
  const [user,setUser] =useState({
    fullName:"",
    userName:"",
    password:"",
    confirmPassword:"",
    gender:""
  })
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      const res =await axios.post(`http://localhost:8000/api/v1/user/register`,user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      console.log(res)
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/login")
        dispatch(setAuthUser(res.data))
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)

    }
    console.log(user)
    setUser({
      fullName:"",
      userName:"",
      password:"",
      confirmPassword:"",
      gender:""
    })
  }
  const handleCheckBox=(gender)=>{
    setUser({...user,gender})
  }
  return (
    <>
      <div className="min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-300 ">
            Register
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div>
              <label className="label p-2">
                <span className="text-base label label-text w-full max-w-xs">
                  Full Name
                </span>
              </label>
              <input
               value={user.fullName}
                onChange={(e)=>setUser({...user,fullName:e.target.value})}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Enter your Full Name"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label label-text w-full max-w-xs">
                  User Name
                </span>
              </label>
              <input value={user.userName}
                className="w-full input input-bordered h-10"
                onChange={(e)=>setUser({...user,userName:e.target.value})}
                type="text"
                placeholder="Enter your userName"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label label-text w-full max-w-xs">
                  Password
                </span>
              </label>
              <input value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label label-text w-full max-w-xs">
                  Confim Password
                </span>
              </label>
              <input
               
              value={user.confirmPassword}
              onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Enter your confirmPassword"
              />
            </div>
            <div className="flex items-center my-4">
              <div className="flex items-center">
                <p>Male</p>
                <input
                 checked={user.gender ==="male"}
                 onChange={()=>handleCheckBox("male")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox mx-2"
                />
              </div>
              <div className="flex items-center">
                <p>Female</p>
                <input 
                checked={user.gender ==="female"}
                onChange={()=>handleCheckBox("female")}
                  type="checkbox"

                  defaultChecked
                  className="checkbox mx-2"
                />
              </div>
            </div>
            <p className="text-center my-2">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Regsiter;
