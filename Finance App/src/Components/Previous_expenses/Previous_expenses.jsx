import React from 'react'

const Previous_expenses = ({no,expense,category}) => {
  return (
    <div className='flex flex-col'>
        <div className="previous-expenses w-full h-[50px] border-t-4 rounded-lg border-yellow-100 bg-gray-800 flex flex-row justify-evenly">
            <div className ="count text-xl text-yellow-100">{no}</div>
            <div className='amount text-xl text-red-400'> Expense: {expense}</div>
            <div className="category text-xl text-yellow-100">Category:     {category}</div>
        </div>
        <div className='bg-gray-800 w-full w-{20px} h-{50px}'></div>
    </div>
  )
}

export default Previous_expenses
