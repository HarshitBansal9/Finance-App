import React from 'react'
import back from '../Logo/background.jpg';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { Link,NavLink} from 'react-router-dom'
export default function Login_page() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className=" relative w-full h-screen flex justify-center content-center bg-gray-800">
      {/*<img src={back} className='absolute w-full h-full mix-blend-overlay' />*/}

      <div className = "grid-cols-1 md:grid-cols-2 margin-auto h-[550px] w-[500px] border-4 shadow-lg s rounded-xl shadow-grey-800  backdrop-blur-xl sm:max-w-[900px] mt-5 " >
          
          <h2 className="text-center text-4xl text-white font-bold mb-8">FINANCE APP</h2>
          <div className = "flex flex-col items-center"> 
            <input type="text" placeholder='Username' ref={usernameRef} className = " w-[480px]  text-white placeholder-white outline-none focus:placeholder:opacity-0 border-b-4 backdrop-blur-md text-xl bg-transparent p-2 m-1 h-[50px]"/>
            <div className='bg-tansparent h-[25px]'></div>
            <input type = "password"  ref={passwordRef} placeholder='Password' className = "w-[480px] text-white placeholder-white outline-none focus:placeholder:opacity-0 border-b-4 backdrop-blur-md text-xl bg-transparent p-2 m-1 h-[50px]"/>
            <div className='bg-tansparent h-[25px]'></div>
            <button onClick={async ()=>{
              const username = usernameRef.current.value;
              const password = passwordRef.current.value;
              try{
                const response = await axios.post('http://localhost:3002/auth/login',{username,password},{withCredentials:true});
                navigate('/');
              }
              catch{
                alert('Incorrect username or password');
              }
            }} className='w-[150px] border-4 border-white rounded-xl  text-xl text-white py-2 my-4 bg-transparent flex justify-center'>Sign In</button>
          </div>
        
        </div>
    </div>
  )
}

