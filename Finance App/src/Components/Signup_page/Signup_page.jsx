import React from 'react'

import axios from 'axios';
import {useRef,useEffect} from 'react';

//import { Link,NavLink} from 'react-router-dom'
export default function Signup_page(props) {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    useEffect(()=>{
        if (props.LoggedIn){
          window.location.replace(`http://localhost:5173/`);
        }
      },[props.LoggedIn])
    return (
        <div className=" relative w-full h-screen flex justify-center content-center  bg-gray-800">

        <div className = "grid-cols-1 md:grid-cols-2 margin-auto h-[550px] w-[500px] border-4 shadow-lg s rounded-xl shadow-grey-800  backdrop-blur-2xl sm:max-w-[900px] mt-5 " >
            <h2 className="text-center text-4xl text-white font-bold mb-8">FINANCE APP</h2>
            <div className = "flex flex-col items-center"> 
            <input type="text" ref={usernameRef} placeholder='Username' className = " w-[480px]  text-white placeholder-white outline-none focus:placeholder:opacity-0 border-b-4 backdrop-blur-md text-xl bg-transparent p-2 m-1 h-[50px]"/>
            <div className='bg-tansparent h-[25px]'></div>
            <input type="text" ref={emailRef} placeholder='Email' className = " w-[480px]  text-white placeholder-white outline-none focus:placeholder:opacity-0 border-b-4 backdrop-blur-md text-xl bg-transparent p-2 m-1 h-[50px]"/>
            <div className='bg-tansparent h-[25px]'></div>
            <input type = "password" ref={passwordRef} placeholder='Password' className = "w-[480px] text-white placeholder-white outline-none focus:placeholder:opacity-0 border-b-4 backdrop-blur-md text-xl bg-transparent p-2 m-1 h-[50px]"/>
            <div className='bg-tansparent h-[25px]'></div>
            <button onClick={async ()=>{
                const username = usernameRef.current.value;
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                try{
                    const response = await axios.post('http://localhost:3002/auth/register',{username,email,password},{withCredentials:true});
                    props.setLoggedIn(true);
                } catch {
                    alert ('User Already exists!');
                }
            }} className = 'w-[150px]  border-4 border-white rounded-xl  text-xl text-white py-2 my-4 bg-transparent flex justify-center'>Sign Up</button>
            </div>  
            </div>
        </div>
    )
}
