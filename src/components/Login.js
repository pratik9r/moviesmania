import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {query,where,getDocs } from 'firebase/firestore';
import { userRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import { useContext } from 'react';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const useAppState = useContext(Appstate);
   const navigate = useNavigate();
    const [form,setForm] = useState({
       mobileno:"",
       password:""
    });
    const [loading,setLoading] = useState(false);
   
  const logintohome = async() => {
    
      setLoading(true);
      try {
        let quat = query(userRef,where('mobileno',"==",form.mobileno));
        const quedata = await getDocs(quat);
        quedata.forEach((doc)=>{
           const _day = doc.data();
           const isUser = bcrypt.compareSync(form.password, _day.password);
           if(isUser){
             useAppState.setLogin(true);
             useAppState.setUser(_day.name);
            swal({
              text: "Sucessfully Logged In",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            navigate('/');
           }else{
            swal({
              text: 'Invalid Credentials',
              icon: "error",
              buttons: false,
              timer: 3000,
            });
           }
        })
        


      } catch (error) {
        swal({
          text: error,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }



      setLoading(false);
  }





  return (
    <div>
    <section className="text-gray-600 body-font relative">
    <div className="container px-5 py-6 mx-auto my-20">
    <div className="flex flex-col text-center w-full mb-2">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Login</h1>
      
    </div>
    <div className=" mx-auto flex flex-col items-center">
      
        <div className="p-2 w-1/3">
          
            <label htmlFor="mobileno" className="leading-7 text-sm text-gray-300">Mobile Number</label>
            <input type={'number'} id="name" name="mobileno" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             onChange={(e)=>setForm({...form,mobileno:e.target.value})}  value={form.mobileno}/>
          
        </div>
        <div className="p-2 w-1/3">
          
            <label htmlFor="password" className="leading-7 text-sm text-gray-300">Password</label>
            <input type={"password"} id="password" name="password" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
             onChange={(e)=>setForm({...form,password:e.target.value})}  value={form.password} />
            
          
        </div>
        <div className="p-2 w-full mt-10">
          <button 
          onClick={logintohome}
          className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
            {loading?<TailSpin height={25} color='white'/>:'Login'}
            </button>
        </div>
        <div>
            <p className='text-white'>Don't have account ? 
             <Link to={'/signup'}><span className='text-blue-500'>Signup</span></Link>
            </p>
        </div>
      
    </div>
  </div>
</section>
    </div>
  )
}

export default Login