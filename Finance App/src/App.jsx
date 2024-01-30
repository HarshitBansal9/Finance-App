import React, { useEffect, useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Accounts from './Components/Accounts/Accounts.jsx';
import Login_page from './Components/Login_page/Login_page.jsx';
import Signup_page from './Components/Signup_page/Signup_page.jsx';
import Budgets from './Components/Budgets/Budgets.jsx';
import Analysis from './Components/Analysis/Analysis.jsx';
import axios from 'axios';
import { Auth } from './Components/Auth/Auth.jsx';


export const loggedInContext = createContext({
  loggedIn: null,
  setLoggedIn: () => { }
});



export default function App() {
  const [LoggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const response = await axios.get('http://localhost:3002/auth/check', { withCredentials: true });
        console.log(response);
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      }
    }
    checkLoggedIn();
  }, [])
  if (LoggedIn === null) {
    return <></>
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path='' element={<Auth><Home /></Auth>} />
        <Route path='Accounts' element={<Auth><Accounts /></Auth>} />
        <Route path='Analysis' element={<Auth><Analysis /></Auth>} />
        <Route path='Budgets' element={<Auth><Budgets /></Auth>} />
        <Route path='Login_page' element={<Login_page LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path='Signup_page' element={<Signup_page LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />} />
      </Route>
    )
  )
  return (
    <loggedInContext.Provider value={{ loggedIn: LoggedIn, setLoggedIn: setLoggedIn }}>
      <RouterProvider router={router} />
    </loggedInContext.Provider>
  )

}