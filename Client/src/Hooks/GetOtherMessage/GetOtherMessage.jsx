import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../Redux/messageSlice/messageSlice';

const GetOtherMessage = () => {
  const { selectedUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessage = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/message/${selectedUsers._id}`);
          console.log("res123456",res);
          dispatch(setMessage(res.data));
        } catch (error) {
          console.error(error);
        }
      }
    fetchMessage();
  }, [selectedUsers]);

  return ;
};

export default GetOtherMessage;
