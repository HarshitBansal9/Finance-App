import React,{useRef} from 'react';
import { Plus } from 'lucide-react';
import { X } from 'lucide-react';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useState,useEffect } from 'react';
import Previous_accounts from '../Previous_accounts/Previous_accounts';
import axios from 'axios';

function Accounts() {
  const [accounts,setAccounts] = useState([]);
  const [show,setShow] = useState(false);
  const [income,setIncome] = useState(0);
  const [total,setTotal] = useState(null);
  const nameRef = useRef(null);
  const amountRef = useRef(null);
  useEffect(()=>{
    async function getData(){
      const response = await axios.get('http://localhost:3002/auth/account',{withCredentials:true});
      let a = 0;
      for (let i of response.data){
        a+= i.amount;
      }
      setIncome(a);
      setAccounts(response.data);
    }
    async function getTotal(){
      const response = await axios.get('http://localhost:3002/expense/list',{withCredentials:true});
      setTotal(response.data.total);
    }
    getTotal();
    getData();
  },[])
  return (
    <div>
      <div className='h-screen w-full relative flex flex-col items-center bg-gray-800'>
      {
        show && <div className="expense-container absolute shadow-2xl inset-0 mx-auto my-auto z-10 h-[250px] bg-slate-700 rounded-xl w-[500px] shadow-grey-800 sm:max-w-[900px] m-auto pt-8 top-0 bottom-0 left-0 right-0 flex items-center flex-col">
          <div>
            <input type = "text" ref={nameRef} placeholder='Name' className = "rounded-lg placeholder-yellow-100 focus:placeholder:opacity-0 text-yellow-100 text-xl bg-slate-400 p-2 m-1 w-[480px] h-[50px]"/>
          </div>
          <div>
            <input type = "text" ref={amountRef} placeholder='Amount' className = "rounded-lg placeholder-yellow-100 focus:placeholder:opacity-0 text-yellow-100 text-xl bg-slate-400 p-2 m-1 w-[480px] h-[50px]"/>
          </div>
          <div className="flex flex-row w-full mt-4 justify-evenly"> 
            <button  onClick={async ()=>{
              const name = nameRef.current.value;
              const amount = amountRef.current.value;
              try{
                const accountupdate = await axios.put("http://localhost:3002/auth/createaccount",{name,amount},{withCredentials:true});
                setShow(false)
              }
              catch{
                alert('Fill all the options')
              }
              }} className='text-xl flex w-[100px] rounded-lg flex-row items-center text-lime-400 justify-center hover:bg-slate-500 h-[50px]'>
              <Plus  color="white" size="50px"/>
              Save
            </button>
            <button  onClick={()=>{setShow(false)}} className='text-xl flex w-[100px] rounded-lg flex-row items-center text-red-400 justify-center hover:bg-slate-500 h-[50px]'>
              <X  color="white" size="50px"/>
              Cancel
            </button>
          </div>
        </div>
      }
        <h3 className='text-yellow-100 text-xl'>Overall</h3>
        <div className='h-[200px] w-[500px] m-4 rounded-xl  border-yellow-100 border-2 shadow-xl'>
          <div className='w-full h-[10px]'></div>
          <div className='w-full m-t flex flex-row  justify-center h-[100px]'>
            <div className='w-[200px] h-full flex flex-col justify-center items-center border-r border-b-2'>
              <h4 className='text-yellow-100 m-2 text-xl'>EXPENSE SO FAR</h4>
              <h4 className='m-2 text-red-400 text-xl'>-₹{total}</h4>
            </div>
            <div className='w-[200px] h-full flex flex-col justify-center items-center border-l border-b-2'>
              <h4 className='text-yellow-100 m-2 text-xl'>INCOME SO FAR</h4>
              <h4 className='m-2 text-lime-400 text-xl'>₹{income}</h4>
            </div>
          </div>
          <div className='w-full flex flex-col  justify-center items-center h-[100px]'>
            <h4 className="text-xl text-yellow-100">TOTAL BALANCE</h4>
            <h4 className='text-xl mt-2 mb-4 text-yellow-100'> ₹{(income-total)}</h4>
          </div>
        </div>
        <h3 className='text-yellow-100 text-xl'>Accounts</h3>
        <div className='Previous_accounts grid grid-cols-3 justify-center h-[300px] w-[1000px]'>
          {accounts.map((item,index)=>{
            return <Previous_accounts key={index} name={item.name} amount={item.amount}/>
          })}
          
        </div>
        <div  onClick={()=>{setShow(true)}} className='w-[300px] h-[50px] border-yellow-100 border-2 rounded-xl mt-2 hover:bg-slate-500 flex flex-row justify-center items-center'>
          <PlusCircle color="rgb(254 249 195)"/>
          <h2 className='text-xl ml-2 text-yellow-100 hover:cursor-pointer'>ADD NEW ACCOUNT</h2>
          </div>
      </div>
    </div>
  )
}

export default Accounts
