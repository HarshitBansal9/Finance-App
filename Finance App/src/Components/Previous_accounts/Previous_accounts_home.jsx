import React from 'react'

const Previous_accounts_home = ({name,amount}) => {
  return (
    <div className='w-[500px] h-[75px] mt-2 flex'>
        <div className="w-[325px] h-[75px] border-2 rounded-lg border-yellow-100 bg-slate-700 flex items-center relative flex-row">
          <div className ="count text-xl items-start absolute left-0 text-yellow-100">{name}</div>
          <div className='h-full'></div>
          <div className='amount text-xl absolute right-0 text-yellow-100 flex flex-row'> Balance: <div className='w-[5px]'></div><h4 className='text-lime-400'> ₹{amount} </h4> </div>
        </div>
    </div>
  )
}

export default Previous_accounts_home