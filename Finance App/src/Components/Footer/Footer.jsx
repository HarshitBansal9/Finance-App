import React from 'react'
import { Link,NavLink} from 'react-router-dom'
function Footer() {
  return (
    <footer className="shadow sticky z-50 top-0">
      <nav className="bg-slate-700 border-gray-200 px-4 h-20 lg:px-6 py-2.5 flex flex-row items-center justify-evenly">
        <p className='font-sans text-white text-2xl'>Expense:</p>
        <p className='font-sans text-white text-2xl'>Income:</p>
        <p className='font-sans text-white text-2xl'>Total:</p>
      </nav>
    </footer>
  )
}

export default Footer
