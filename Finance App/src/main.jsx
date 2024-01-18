import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Adjust_budgets from './Components/Adjust_budgets/Adjust_budgets.jsx';
import Login_page from './Components/Login_page/Login_page.jsx';
import Signup_page from './Components/Signup_page/Signup_page.jsx';
import Analysis from './Components/Analysis/Analysis.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='Adjust_budgets' element={<Adjust_budgets />} />
      <Route path='Analysis' element={<Analysis />} />
      <Route path = 'Login_page' element={<Login_page />} />
      <Route path = 'Signup_page' element={<Signup_page />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
