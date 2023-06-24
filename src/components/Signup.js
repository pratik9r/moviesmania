import React,{useState} from 'react'
import { TailSpin } from 'react-loader-spinner';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import app from '../firebase/firebase';
import swal from 'sweetalert';

import { useNavigate } from 'react-router-dom';
import { userRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const auth = getAuth(app);


const Signup = () => {
    const [form,setForm] = useState({
        name:"",
        mobileno:"",
        password:""
     });
     const [loading,setLoading] = useState(false);
     const [sentOTP,setSentOTP] = useState(false);
     const [OTP,setOTP] = useState("");
     const navigate = useNavigate();

     const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        }, auth);
}

const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, `+91${form.mobileno}`, appVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
              text: "OTP Sent",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setSentOTP(true);
            setLoading(false);
          }).catch((error) => {
            console.log(error)
          })
}

const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login');
        setLoading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef, {
        name: form.name,
        password: hash,
        mobileno: form.mobileno
      });
    } catch(err) {
      console.log(err);
    }
  }



  return (
    <div>
    <section className="text-gray-600 body-font relative">
    <div className="container px-5 py-6 mx-auto my-20">
    <div className="flex flex-col text-center w-full mb-2">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">SignUp</h1>
    </div>
    {sentOTP ?
      < div className=' mx-auto flex flex-col items-center'>
            <div className="p-2 w-1/3">
            <label htmlFor="otp" className="leading-7 text-sm text-gray-300">OTP</label>
            <input type="text" id="otp" name="otp" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            onChange={(e)=>setOTP(e.target.value)}  value={OTP} />
            </div>
            <div className="p-2 w-full mt-10">
            <button 
              onClick={verifyOTP}
             className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
            {loading?<TailSpin height={25} color='white'/>:'Confirm OTP'}
            </button>
            </div>
      </div>
    : <div className=" mx-auto flex flex-col items-center">
        
        <div className="p-2 w-1/3">
            
            <label htmlFor="name" className="leading-7 text-sm text-gray-300">Name</label>
            <input type={'text'} id="name" name="name" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={(e)=>setForm({...form,name:e.target.value})}  value={form.name}/>
            
        </div>

        <div className="p-2 w-1/3">
          
            <label htmlFor="mobileno" className="leading-7 text-sm text-gray-300">Mobile Number</label>
            <input type={'number'} id="mobileno" name="mobileno" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             onChange={(e)=>setForm({...form,mobileno:e.target.value})}  value={form.mobileno}/>
          
        </div>
        <div className="p-2 w-1/3">
          
            <label htmlFor="password" className="leading-7 text-sm text-gray-300">Password</label>
            <input type={'password'} id="password" name="password" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
             onChange={(e)=>setForm({...form,password:e.target.value})}  value={form.password} />
            
          
        </div>
        <div className="p-2 w-full mt-10">
          <button 
          onClick={requestOtp}
          className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
            {loading?<TailSpin height={25} color='white'/>:'Request OTP'}
            </button>
        </div>
        <div
        id="recaptcha-container">
        </div>

      
    </div>
    }
  </div>
</section>
    </div>
  )
}

export default Signup