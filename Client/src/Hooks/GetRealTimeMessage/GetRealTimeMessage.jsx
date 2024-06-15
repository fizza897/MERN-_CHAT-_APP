import  { useEffect } from 'react'
import { setMessage } from '../../Redux/messageSlice/messageSlice'
import { useSelector,useDispatch } from 'react-redux'

const GetRealTimeMessage = () => {
    const dispatch=useDispatch();
    const {socket} =useSelector(store=>store.socket)
    const {messages} =useSelector(store=>store.message)
    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            dispatch(setMessage([...messages,newMessage]));
        })
    },[socket,setMessage,messages]);
};


export default GetRealTimeMessage