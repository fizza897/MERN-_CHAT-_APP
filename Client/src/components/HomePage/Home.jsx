import React from 'react'
import Sidebar from '../SIdebar/Sidebar';
import MessageContainer from '../MessageContainer/MessageContainer';
const Home = () => {
  return (
    <>
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
    
     
    
    </>
  )
}
export default Home;