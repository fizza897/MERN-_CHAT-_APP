import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../Redux/userSlice/userSlice";
const Login = () => {
  const [user,setUser] =useState({
    userName:"",
    password:"",
  })
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const onSubmitHandler =async(e)=>{
    e.preventDefault();
    try {
      const res =await axios.post(`http://localhost:8000/api/v1/user/login`,user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      console.log(res)
        navigate("/");
        dispatch(setAuthUser(res.data))
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
    console.log(user)
    setUser({
      userName:"",
      password:"",
    })
  }
  return (
    <>
      <div className="min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-300 ">
            Login
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div>
              <label className="label p-2">
                <span className="text-base label label-text w-full max-w-xs">
                  User Name
                </span>
              </label>
              <input
                value={user.userName}
                onChange={(e)=>setUser({...user,userName:e.target.value})}
                className="w-full input input-bordered h-10"
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
              <input
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <p className="text-center my-2">
              Don't have an account? 
              <Link to="/register"> Register</Link>
            </p>
            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
