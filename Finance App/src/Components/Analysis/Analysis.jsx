import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Chart as ChartJS} from "chart.js/auto";
import { Pie } from "react-chartjs-2"
import { Bar } from "react-chartjs-2"
import { Line } from "react-chartjs-2"

function Analysis() {
  const [Expenses,setExpenses] = useState([]);
  const [Accounts,setAccounts]= useState([]);
  const [Monthinfo,setMonthinfo] = useState([])
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
      setExpenses(Data)   
    }
    async function getAccounts(){
      const response = await axios.get('http://localhost:3002/auth/account',{withCredentials:true});
      console.log(response.data)
      setAccounts(response.data);
    }
    async function monthData(){
      const response = await axios.get('http://localhost:3002/expense/list',{withCredentials:true});
      let monthData = [{name:"January",amount:0},{name:"February",amount:0},{name:"March",amount:0},{name:"April",amount:0},{name:"May",amount:0},{name:"June",amount:0},{name:"July",amount:0},{name:"August",amount:0},{name:"September",amount:0},{name:"October",amount:0},{name:"November",amount:0},{name:"December",amount:0}]
      for (let i of response.data.expenses){
        monthData[Number((i.createdAt).slice(5,7))-1].amount += i.expense  
      }
      console.log(monthData)
      setMonthinfo(monthData)
    }
    monthData();
    getAccounts();
    getData();
  },[])
  return (

    <div className='h-[650px] w-full justify-center bg-gray-800'>
      <div className='w-full h-1/2 mt-4 relative bg-gray-800'>
        <div className="montlyinfo absolute w-[800px] h-full bg-slate-700 shadow-2xl flex justify-center rounded-lg top-0 left-7">
        <div className='h-[275px] w-[600px]'>
        <div className='text-xl text-yellow-100'>Monthly Analysis</div>
        <Line
          data={{
            labels: Monthinfo.map((data)=>data.name),
            datasets:[
              {
                label: "Monthly info",
                data: Monthinfo.map((data)=>data.amount),
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
        <div className="category absolute w-[500px] h-full rounded-lg shadow-2xl bg-slate-700 right-80 flex flex-col items-center">
        <div className='text-xl text-yellow-100'>Category Analysis</div>
        <div className='w-[300px] h-[280px] mb-2'>
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
        </div>
        <div className='bg-gray-800 h-full w-[275px] absolute right-6 rounded-lg'>
          <div className="h-full w-full relative">
            <div className='w-full h-[150px] bg-slate-700 absolute rounded-lg shadow-2xl'></div>
            <div className='w-full h-[150px] bg-slate-700 absolute bottom-0 rounded-lg shadow-2xl'></div>
          </div>
        </div>
      </div>
      {/*
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
      <div style={{width:500}}>
        <Line
          data={{
            labels: Monthinfo.map((data)=>data.name),
            datasets:[
              {
                label: "Monthly info",
                data: Monthinfo.map((data)=>data.amount),
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
        */}
    </div>
  )
}

export default Analysis
