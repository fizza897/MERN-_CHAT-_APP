import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {setMessage} from "../../Redux/messageSlice/messageSlice"
const SendMessage = () => {
  const [message,setMessages] =useState("");
  const {selectedUsers} =useSelector(store=>store.user);
  const {messages} =useSelector(store=>store.message)
  
  const dispatch =useDispatch();
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUsers?._id}`,{message},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      console.log("res",res)
      dispatch(setMessage([...messages,res?.data.newMessage]))
    } catch (error) {
      console.log(error)
    }
    setMessages("")
  }
  return (
    <>
    <form className='px-4 my-3' onClick={onSubmitHandler}>
        <div className='w-full relative'>
            <input
            className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
            value={message}
            onChange={(e)=>setMessages(e.target.value)} 
            type="text"
             placeholder='Send Message'
             />
             <button type='submit' className='absolute inset-y-0 end-0 flex items-center pr-4'>
                <IoSend/>
             </button>
        </div>
    </form>
    
    </>
  )
}

export default SendMessage