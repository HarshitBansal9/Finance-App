import React,{useState} from 'react'
import { Link,NavLink} from 'react-router-dom'
import logo from '../Logo/Logo.png'
import { Home } from 'lucide-react'
import { Wallet } from 'lucide-react'
import { PieChart } from 'lucide-react'
import { Calculator } from 'lucide-react'
import axios from 'axios';
import { useContext } from 'react';
import { loggedInContext } from '../../App'
export default function Header() {
    const { loggedIn, setLoggedIn } = useContext(loggedInContext);
    const show = loggedIn;
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-slate-700 border-gray-200 px-4 h-20 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/" className="flex items-center justify-self-start self-center">
                        <div className='text-xl text-yellow-100'>Finance App</div>
                    </Link>
                    {
                        show && <div className="flex items-center lg:order-2">
                                <Link
                                    to="/Login_page"
                                    onClick={async ()=>{
                                          const response = await axios.post('http://localhost:3002/auth/logout',{},{withCredentials:true});
                                          setLoggedIn(false);
                                    }}
                                    className="text-white hover:text-gray-500 font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Log out
                                </Link>
                        </div>
                    }  
                    {
                        !show && <div className="flex items-center lg:order-2">
                            <Link
                                to="/Login_page"
                                className="text-white hover:text-gray-500 font-medium rounded-lg text-xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/Signup_page"
                                className="text-white bg-gray-800 hover:bg-gray-500  font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Get started
                            </Link>
                        </div>
                    } 
                    {      
                        show && <div
                            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li className="flex flex-col justify-center items-center">
                                        <Home color="rgb(254 249 195)" size={25} />
                                        <NavLink to = "/"
                                            className={({isActive}) =>
                                                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-yellow-400":"text-yellow-100"} lg:hover:bg-transparent hover:text-gray-800 lg:border-0 text-xl lg:p-0`
                                            }
                                        >
                                            Home
                                        </NavLink>
                                </li>
                                <li className = "flex flex-col justify-center items-center">
                                        <Wallet color="rgb(254 249 195)" size={25} />
                                    <NavLink to = "/Accounts"
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-yellow-400":"text-yellow-100"} lg:hover:bg-transparent lg:border-0 text-xl hover:text-gray-800 lg:p-0`
                                        }
                                    >
                                        Accounts
                                    </NavLink>
                                </li>
                                <li className="flex flex-col justify-center items-center">
                                        <Calculator color="rgb(254 249 195)" size={25} />
                                        <NavLink to = "/Budgets"
                                            className={({isActive}) =>
                                                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-yellow-400":"text-yellow-100"} lg:hover:bg-transparent hover:text-gray-800 lg:border-0 text-xl lg:p-0`
                                            }
                                        >
                                            Budgets
                                        </NavLink>
                                </li>
                                <li className="flex flex-col justify-center items-center">
                                        <PieChart color="rgb(254 249 195)" size={25} />
                                        <NavLink to = "/Analysis"
                                            className={({isActive}) =>
                                                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive?"text-yellow-400":"text-yellow-100"} lg:hover:bg-transparent hover:text-gray-800 lg:border-0 text-xl lg:p-0`
                                            }
                                        >
                                            Analysis
                                        </NavLink>
                                </li>
                                        
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}