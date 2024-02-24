import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Chart as ChartJS} from "chart.js/auto";
import { Pie } from "react-chartjs-2"
import { Bar } from "react-chartjs-2"

function Analysis() {
  const [Expenses,setExpenses] = useState([]);
  const [Accounts,setAccounts]= useState([]);
  useEffect(()=>{
    async function getData(){
      const response = await axios.get('http://localhost:3002/expense/list',{withCredentials:true});
      //setTotal(response.data.expenses);
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
      console.log(Data);
      setExpenses(Data)   
    }
    async function getAccounts(){
      const response = await axios.get('http://localhost:3002/auth/account',{withCredentials:true});
      console.log(response.data);
      setAccounts(response.data);
    }
    getAccounts();
    getData();
  },[])
  return (

    <div className='h-[650px] w-full relative flex flex-row items-center justify-center bg-gray-800'>
      <div style={{width:500}}>
        <Pie 
          data={{
            labels: Expenses.map((data)=>data.category),
            datasets:[
              {
                label: "Expenses",
                data: Expenses.map((data)=>data.expense),
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
      <div style={{width:500}}>
        <Bar
          data={{
            labels: Accounts.map((data)=>data.name),
            datasets:[
              {
                label: "Accounts",
                data: Accounts.map((data)=>data.amount),
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
  )
}

export default Analysis
