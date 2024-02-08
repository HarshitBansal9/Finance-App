import React from 'react'
import { Plus } from 'lucide-react'
import { Check } from 'lucide-react'
import { X } from 'lucide-react'
import {Chart as ChartJS} from "chart.js/auto";
import { Pie } from "react-chartjs-2"
import { NavLink,useNavigate} from 'react-router-dom'
import {useState,useRef,useEffect} from 'react';
import Previous_expenses from '../Previous_expenses/Previous_expenses';
import axios from 'axios';
import Previous_accounts_home from '../Previous_accounts/Previous_accounts_home';
let count = 1;
function Home() {
  const navigate = useNavigate();
  const [show,setShow] = useState(false);
  const [expenses,setExpenses] = useState([]);
  const [Analysis,setAnalysis] = useState([]);
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
      let temp = response.data.expenses;
      let Data = [],flag;
      for (let i of temp){
        flag = false;
        for (let j of Data){
          if (j.category === i.category){
            console.log('I entered here');
            j.expense += i.expense;
            flag = true;
          }
        }
        if (flag == false){
          Data.push(i)
        }
      };
      setAnalysis(Data)   
      setExpenses(response.data.expenses.map((expense,i)=>{
        return {
          no:i,
          ...expense
        }
      }))

    }
    getData();
  },[])
  const [accounts,setAccounts] = useState([])
  useEffect(()=>{
    async function getAccounts(){
      const response = await axios.get('http://localhost:3002/auth/account',{withCredentials:true});
      setAccounts(response.data);
    }
    getAccounts();
  },[])
  return (
    <div className='h-screen w-full relative z-0 content-center bg-gray-800'>
      {
        show && <div className="expense-container absolute shadow-2xl inset-0 mx-auto my-auto z-10 grid grid-cols-1  h-[300px] bg-slate-700 rounded-xl w-[500px] shadow-grey-800 sm:max-w-[900px] m-auto pt-8 top-0 bottom-0 left-0 right-0 ">
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
      <div className='h-screen absolute z-0 w-full grid grid-cols-3'>
        {/*Accounts*/}
        <div className="h-screen flex border-2 flex-col">
          <div className='h-1/2 w-full border-2'>
            <NavLink to = "/Accounts"
                  className={({isActive}) =>
                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-yellow-400":"text-yellow-100"}  hover:underline lg:hover:bg-transparent  lg:border-0 text-xl lg:p-0`
                  }
              >
                  Accounts
            </NavLink>
              {accounts.map((item,index)=>{
                  return <Previous_accounts_home name={item.name} amount={item.amount}/>
              })}
          </div>
          <div className='h-[50%] text-xl text-yellow-100'>
            Budgets
          </div>
        </div>
        {/*Expenses*/}
        <div className = 'h-screen previous-expenses-container'>
          <h1 className='text-4xl text-yellow-100'>Previous expenses</h1>
          {expenses.map((item,index)=>{
            return <Previous_expenses key={index} no={item.no} expense={item.expense} category={item.category}/>
          })}
        </div> 
        <button  onClick={()=>{setShow(true)}} class="absolute right-0 bottom-0 bg-slate-700 shadow-xl h-[100px] w-[300px] m-4 rounded-full flex items-center">
          <div className='absolute h-[100px] w-[100px] bg-neutral-600 rounded-full flex items-center justify-center my-auto inset-0'><Plus  color="rgb(254 249 195)" size="50px"/></div>
          <h1 className="absolute right-12 text-xl text-yellow-100">ADD EXPENSE</h1>
        </button>
       
        {/*Analysis*/}
        <div className='h-[50%] border-2'>
          <NavLink to = "/Analysis"
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-yellow-400":"text-yellow-100"}  hover:underline lg:hover:bg-transparent  lg:border-0 text-xl lg:p-0`
                }
            >
                Analysis
          </NavLink>
          <div className="h-[330px] w-full flex justify-center items-center">
            <Pie 
              data={{
                labels: Analysis.map((data)=>data.category),
                datasets:[
                  {
                    label: "Expenses",
                    data: Analysis.map((data)=>data.expense),
                    backgroundColor:[
                      "rgb(253 230 138)",
                      "rgb(180 83 9)",
                      "rgb(234 179 8)",
                      "#f3ba2f",
                      "#2a71d0",
                    ],
                    borderColor:"black",
                    borderWidth:2,
                  }
                ]
              }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
