import React from 'react'
import {Outlet} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Auth } from './Components/Auth/Auth';
export  default function Layout(props){
  return (

    <>
        <Header LoggedIn={props.LoggedIn} setLoggedIn={props.setLoggedIn} />
        <Outlet />
        <Auth>
          <Footer />
        </Auth>
    </>
  )
}


