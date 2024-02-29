import React,{useState,useEffect,useRef} from 'react';
import { Check } from 'lucide-react'
import { X } from 'lucide-react'
import axios from 'axios';

const Previous_accounts = ({name,amount}) => {
  const [show,setShow] = useState(false);
  const [edit,setEdit] = useState(false);
  let menuRef = useRef(false);
  let amountRef = useRef(null);
  useEffect(()=>{
    let handler = (e)=>{
      if(!(menuRef.current.contains(e.target))){
        setShow(false);
      }
      if(e.target){
        setEdit(false);
      }
    };
    document.addEventListener("mousedown",handler);
  })
  return (
    <div className='w-[300px] h-[75px] mt-2 flex justify-center'>
      {edit &&
        <div className = "bg-slate-700 absolute inset-0 z-10 border-2 border-black mx-auto rounded-xl my-auto h-[150px] w-[300px]">
          <div className='text-xl mt-4 ml-4 text-yellow-100'>Enter new amount:</div>
          <input  ref={amountRef} defaultValue={amount} className="bg-slate-600 text-xl text-yellow-100 rounded-lg mt ml-4 h-[45px] w-[250px]" type="text" />
          <div className="flex justify-evenly">
            <button  onClick={async ()=>{
              console.log(amount);
              amount = Number(amountRef.current.value - Number(amount));
              try{
                const accountupdate = await axios.put("http://localhost:3002/auth/updateaccount",{name,amount},{withCredentials:true});
                setEdit(false)
                location.reload();
              } catch {
                alert("Fill all the options")
              }
              }} className='text-xl flex w-[100px] rounded-lg flex-row items-center text-lime-400 justify-center hover:bg-slate-500 h-[50px]'>
              <Check  color="white" size="50px"/>
              Save
            </button>
            <button  onClick={()=>{setEdit(false)}} className='text-xl flex w-[100px] rounded-lg flex-row items-center text-red-400 justify-center hover:bg-slate-500 h-[50px]'>
              <X  color="white" size="50px"/>
              Cancel
            </button>
          </div>
        </div>
      }
        <div className="w-[300px] h-[75px] border-2 absolute rounded-lg border-yellow-100 bg-slate-700 flex flex-row items-center justify-evenly">
            <div className='h-[75px] w-[300px] flex justify-center flex-col'>
                <div className ="count text-xl text-yellow-100">{name}</div>
                <div className='amount text-xl text-yellow-100 flex flex-row'> Balance: <div className="w-[10px]"></div><h4 className='text-lime-400'> ₹{amount} </h4> </div>
            </div>
            <div className='w-[50px] h-[75px] mt-8'>
              <div onClick={()=>{setShow(!show)}} className="hover:bg-slate-400 rounded-full h-[40px] w-[40px] text-xl flex justify-center text-yellow-100">.  .   .</div>
              { show &&       
                <div ref={menuRef} className='bg-slate-700 h-[150px] w-[300px] relative z-10 flex flex-col'>
                  <div onClick={()=>{setEdit(true);setShow(false)}} className='w-full text-xl border-2 hover:bg-slate-600 border-yellow-100 text-yellow-100 h-[75px] flex justify-center items-center'>Edit</div>
                  <div onClick={async ()=>{
                    try{
                      const accountDelete = await axios.put("http://localhost:3002/auth/deleteaccount",{name},{withCredentials:true});
                      setEdit(false);
                      location.reload();  
                    } catch{
                      alert("Try again")
                    }
                  }} className='w-full text-xl border-2 hover:bg-slate-600 border-yellow-100 text-yellow-100 h-[75px] flex justify-center items-center'>Delete</div>
                </div>
              }
            </div>
        </div>
    </div>
  )
}

export default Previous_accounts