import React, { useEffect,useState } from 'react'
import ReactDOM from 'react-dom/client'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Adjust_budgets from './Components/Adjust_budgets/Adjust_budgets.jsx';
import Login_page from './Components/Login_page/Login_page.jsx';
import Signup_page from './Components/Signup_page/Signup_page.jsx';
import Analysis from './Components/Analysis/Analysis.jsx';
import axios from 'axios';



export default function App() {
  const [LoggedIn,setLoggedIn] = useState(null);
  useEffect(()=>{
    async function checkLoggedIn(){
      try{
        const response = await axios.get('http://localhost:3002/auth/check',{withCredentials:true});
        console.log(response);
        setLoggedIn(true);
      } catch{
        setLoggedIn(false);
      }
    }
    checkLoggedIn();
  },[])
  if (LoggedIn === null){
    return <></>
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/"  element={<Layout LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>}>
        <Route path='' loader={()=>{
          console.log(`user is logged in ,${LoggedIn}`);
          if(!LoggedIn){
            window.location.replace(`http://localhost:5173/Login_page`);
            return null;
         } else {
            return null;
         }
        }} element={<Home />}/>
        <Route path='Adjust_budgets' loader={()=>{
          if(!LoggedIn){
             window.location.replace(`http://localhost:5173/Login_page`);
             return null;
          } else {
            return null;
          }
        }} element={<Adjust_budgets />} />
        <Route path='Analysis'  loader = {()=>{
          if(!LoggedIn){
            window.location.replace(`http://localhost:5173/Login_page`);
            return null;
         } else {
           return null;
         }
        }}
        element={<Analysis />} />
        <Route path = 'Login_page' element={<Login_page LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path = 'Signup_page' element={<Signup_page />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
  
}

