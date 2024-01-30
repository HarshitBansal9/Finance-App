import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Adjust_budgets() {
  useLoaderData();
  return (
    <div>
      <div className='h-[650px] w-full relative flex flex-col content-center bg-gray-800'></div>
    </div>
  )
}

export default Adjust_budgets
