import React from 'react'
import { Plus } from 'lucide-react'
import { Check } from 'lucide-react'
import { X } from 'lucide-react'
import {useState,useRef,useEffect} from 'react';
import Previous_expenses from '../Previous_expenses/Previous_expenses';
import axios from 'axios';
let count = 1;
function Home() {
  const [show,setShow] = useState(false);
  const [expenses,setExpenses] = useState([]);
  const expenseRef = useRef(null);
  const categoryRef = useRef(null);
  //creates an object which stores the amount and category
  const add = () =>{  
    setShow(false);
    setExpenses([...expenses,{no:count++,expense:expenseRef.current.value,category:categoryRef.current.value}]);
  }
  //displaying in console whenever details are entered  
  useEffect(()=>{
    async function getData(){
      const response = await axios.get('http://localhost:3002/expense/list',{withCredentials:true});
      //console.log(response);
      setExpenses(response.data.expenses.map((expense,i)=>{
        return {
          no:i,
          ...expense
        }
      }))
    }
    getData();
  },[])
  return (
    <div className='h-[650px] w-full relative flex flex-col content-center bg-gray-800'>
      <h2 className='text-3xl font-bold w-full text-yellow-100'>Previous Expenses:</h2>
      <div className = 'previous-expenses-container w-full'>
        {expenses.map((item,index)=>{
          return <Previous_expenses key={index} no={item.no} expense={item.expense} category={item.category}/>
        })}
      </div>
      { 
        show && <div className="expense-container grid grid-cols-1  h-[300px] bg-slate-700 rounded-xl w-[500px] shadow-lg shadow-grey-800 sm:max-w-[900px] m-auto pt-8 top-0 bottom-0 left-0 right-0 ">
          <div className = "flex flex-col w-300"> 
                <input ref={expenseRef} type="number" placeholder='Amount' className = "rounded-lg placeholder-yellow-100 focus:placeholder:opacity-0 text-yellow-100 text-xl bg-slate-400 p-2 m-1 h-[50px]"/>
                <input ref={categoryRef} type = "text"  placeholder='Category' className = "rounded-lg placeholder-yellow-100 focus:placeholder:opacity-0 text-yellow-100 text-xl bg-slate-400 p-2 m-1 h-[50px]"/>
          </div>
          <div className='flex flex-row justify-evenly'>
            <button  onClick={async ()=>{
                const expense = expenseRef.current.value;
                const category = categoryRef.current.value;
                try{
                  const response = await axios.post('http://localhost:3002/expense/create',{expense,category},{withCredentials:true});
                  add()
                }
                catch{
                  alert('Incorrect username or password');
                }
              } } className='text-xl flex w-[100px] rounded-lg flex-row items-center text-lime-500 justify-center hover:bg-slate-500 h-[50px]'>
              <Check  color="white" size="50px"/>
              Save
            </button>
            <button  onClick={()=>{setShow(false)}} className='text-xl flex w-[100px] rounded-lg flex-row items-center text-red-400 justify-center hover:bg-slate-500 h-[50px]'>
              <X  color="white" size="50px"/>
              Cancel
            </button>
          </div>
        </div>
      } 
      <button  onClick={()=>{setShow(true)}} class="absolute right-0 bottom-0 bg-gray-700 shadow-xl h-[100px] w-[100px] m-4 rounded-full flex items-center justify-center">
        <Plus  color="rgb(254 249 195)" size="50px"/>
      </button>

    </div>
  )
}

export default Home
