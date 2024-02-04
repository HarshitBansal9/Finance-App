import React from 'react'

const Previous_accounts = ({name,amount}) => {
  return (
    <div className='w-[300px] h-[75px] mt-2 flex justify-center'>
        <div className="w-[300px] h-[75px] border-2 rounded-lg border-yellow-100 bg-slate-700 flex flex-row items-center justify-evenly">
            <div className='h-[75px] w-[300px] flex justify-center flex-col'>
                <div className ="count text-xl text-yellow-100">{name}</div>
                <div className='amount text-xl text-yellow-100 flex flex-row'> Balance: <div className="w-[10px]"></div><h4 className='text-lime-400'> ₹{amount} </h4> </div>
            </div>
            <div className="hover:bg-slate-400 rounded-full h-[40px] w-[40px] text-xl flex justify-center text-yellow-100">.  .   .</div>
        </div>
    </div>
  )
}

export default Previous_accounts