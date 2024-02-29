import React from 'react'

const Previous_accounts_home = ({name,amount}) => {
  return (
    <div className='flex flex-col w-full justify-center'>
        <div className="previous-expenses mb-2 w-[545px] h-[50px] border-t-2 ml-2 mr-2 border-slate-700  bg-gray-800 flex items-center flex-row">
            <div className="category text-lg text-yellow-100"> {name}</div>
          <div className='amount text-xl ml-auto mr-3 text-lime-400 flex'><div className='mr-px'></div>₹{amount.toFixed(2)}</div>
        </div>
        <div className='bg-gray-800 w-full w-{20px} h-{50px}'></div>
    </div>
  )
}

export default Previous_accounts_home