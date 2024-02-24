import React,{useState,useEffect} from 'react'
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Budgets() {
  const [accounts,setAccounts]= useState([]);
    useEffect(()=>{
        setAccounts(["a","b","c","d"])
    },[])
  useLoaderData();
  return (
    <div>
      <div className='h-[650px] w-full relative flex flex-col content-center bg-gray-800'>
        <div className="w-[200px] h-[50px]">
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">     
            <option value="" disabled selected>Choose an account</option>      
            {accounts.map((item,index)=>{
              return <option key={index} className="text-xl">{item}</option>
            })} 
          </select>
        </div>
      </div>
    </div>
  )
}

export default Budgets
