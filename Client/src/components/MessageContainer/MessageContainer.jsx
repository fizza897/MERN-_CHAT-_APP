import React from 'react'
import SendMessage from '../SendMessage/SendMessage';
import Message from './Message/Message';
import {  useSelector } from 'react-redux';
 const MessageContainer = () => {
    const {selectedUsers} =useSelector(store=>store.user);
    const {authUser}  =useSelector(store=>store.user);
    const {onlineUsers} =useSelector(store=>store.user);
    const isOnline=onlineUsers.includes(selectedUsers?._id);
  return (
    <>
    {
        selectedUsers !== null ? (

    <div className='md:min-w-[550px] flex flex-col'>
        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
            <div className={`avatar ${isOnline? "online" : "" }`}>
                <div className='w-12 rounded-full'>
                <img src={selectedUsers?.profilePhoto} alt="" srcset="" />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                    <p>{selectedUsers?.fullName}</p>
                </div>
            </div>
        </div>
        <Message/>
        <SendMessage/>
    </div>
        ):(
            <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                <h1 className='text-white text-4xl'>Hi, {authUser?.fullName}</h1>
                <h1 className='text-white text-2xl font-semibold'>Let's start conversations</h1>
            </div>
        )
    }
    
    
    </>
  )
}
export default MessageContainer;