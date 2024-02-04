import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useState,useEffect } from 'react';
import Previous_accounts from '../Previous_accounts/Previous_accounts';
import axios from 'axios';

function Accounts() {
  const [accounts,setAccounts] = useState([])
  useEffect(()=>{
    async function getData(){
      const response = await axios.get('http://localhost:3002/auth/account',{withCredentials:true});
      setAccounts(response.data);
    }
    getData();
  },[])
  return (
    <div>
      <div className='h-[650px] w-full relative flex flex-col items-center bg-gray-800'>
        <h3 className='text-yellow-100 text-xl'>Overall</h3>
        <div className='h-[200px] w-[500px] m-4 rounded-xl  border-yellow-100 border-2 shadow-xl'>
          <div className='w-full h-[10px]'></div>
          <div className='w-full m-t flex flex-row  justify-center h-[100px]'>
            <div className='w-[200px] h-full flex flex-col justify-center items-center border-r border-b-2'>
              <h4 className='text-yellow-100 m-2 text-xl'>EXPENSE SO FAR</h4>
              <h4 className='m-2 text-red-400 text-xl'>-₹382.00</h4>
            </div>
            <div className='w-[200px] h-full flex flex-col justify-center items-center border-l border-b-2'>
              <h4 className='text-yellow-100 m-2 text-xl'>INCOME SO FAR</h4>
              <h4 className='m-2 text-lime-400 text-xl'>₹3,050.00</h4>
            </div>
          </div>
          <div className='w-full flex flex-col  justify-center items-center h-[100px]'>
            <h4 className="text-xl text-yellow-100">TOTAL BALANCE</h4>
            <h4 className='text-xl mt-2 mb-4 text-yellow-100'> ₹2,668.00 </h4>
          </div>
        </div>
        <h3 className='text-yellow-100 text-xl'>Accounts</h3>
        <div className='Previous_accounts overflow-scroll scrollbar-thin scrollbar-thumb-slate-700 grid grid-cols-3 justify-center h-[300px] w-[1000px]'>
          {accounts.map((item,index)=>{
            return <Previous_accounts name={item.name} amount={item.amount}/>
          })}
          
        </div>
        <div className='w-[300px] h-[50px] border-yellow-100 border-2 rounded-xl mt-2  flex flex-row justify-center items-center'>
          <PlusCircle color="rgb(254 249 195)"/>
          <h2 className='text-xl ml-2 text-yellow-100 hover:cursor-pointer'>ADD NEW ACCOUNT</h2>
          </div>
      </div>
    </div>
  )
}

export default Accounts
