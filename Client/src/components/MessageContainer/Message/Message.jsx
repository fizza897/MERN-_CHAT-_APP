import React from 'react'
import SingleMessage from '../SingleMessage/SingleMessage'
import GetOtherMessage from '../../../Hooks/GetOtherMessage/GetOtherMessage'
import { useSelector } from 'react-redux'
import GetRealTimeMessage from '../../../Hooks/GetRealTimeMessage/GetRealTimeMessage'

const Message = () => {
  GetOtherMessage();
  GetRealTimeMessage();
  const {messages} =useSelector(store=>store.message)
  return (
  
    <div className='px-4 flex-1 overflow-auto'>
      {
        messages && messages?.map((message)=>{
          return(
            <SingleMessage key={message._id} message={message}/>     

          )
        })
      }       
    </div>
  
  )
}

export default Message