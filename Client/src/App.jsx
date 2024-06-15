import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Regsiter from './Pages/Register/Regsiter';
import Login from './Pages/Login/Login';
import Home from './components/HomePage/Home';
import { useDispatch, useSelector } from 'react-redux';
import {io} from "socket.io-client"
import { setSocket } from './Redux/socketSlice/socketSlice';
import { setOnlineUsers } from './Redux/userSlice/userSlice';
 const App = () => {
  const dispatch=useDispatch()
  const {socket} =useSelector(store=>store.socket)
  const {authUser} =useSelector(store=>store.user);
  useEffect(()=>{
    if(authUser){
      const socket=io("http://localhost:8000",{
        query:{
          userId:authUser._id
        }
      });
    dispatch(setSocket(socket));
    socket.on("getOnlineUsers",(onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers))
    });
    return ()=> socket.close();
  }
  else{
    if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }
},[authUser]);
  const route=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/register",
      element:<Regsiter/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ])
  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center'>
    <RouterProvider router={route}/>
    </div>
    
    </>
  )
}
export default App;