import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appstate } from '../App';

const AddMovie = () => {
    const [form,setForm] = useState({
        title:"",
        year:"",
        description:"",
        image:"",
        rating:0,
        rated:0
    });  

    const navigate = useNavigate();
    const useAppState = useContext(Appstate);

    const [loading,setLoading] = useState(false);
    const addmovies = async()=>{
        setLoading(true);
        try{
          if(useAppState.login){
            await addDoc(moviesRef,form);
            swal({
                title: "Successfully added",
                icon: "success",
                buttons: false,
                timer: 3000
              })
            setForm({
                title:"",
                year:"",
                description:"",
                image:""
            })
          }else{
            navigate('/login');
          }
        }catch(err){
            swal({
                title: err,
                icon: "error",
                buttons: false,
                timer: 3000
              })
        }
        setLoading(false);
        
    }
  return (
    <div>
        <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-6 mx-auto my-20">
    <div className="flex flex-col text-center w-full mb-2">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Add Movie</h1>
      
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-300">Title</label>
            <input type="text" id="name" name="name" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             onChange={(e)=>setForm({...form,title:e.target.value})}  value={form.title}/>
            
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-300">Year</label>
            <input type="text" id="email" name="email" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
             onChange={(e)=>setForm({...form,year:e.target.value})}  value={form.year} />
            
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="imagelink" className="leading-7 text-sm text-gray-300">Image Link</label>
            <input type="text" id="imagelink" name="imagelink" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
             onChange={(e)=>setForm({...form,image:e.target.value})}  value={form.image} />
            
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-sm text-gray-300">Description</label>
            <textarea id="message" name="message" className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            onChange={(e)=>setForm({...form,description:e.target.value})}  value={form.description} ></textarea>
          </div>
        </div>
        <div className="p-2 w-full">
          <button onClick={addmovies} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">
            {loading?<TailSpin height={25} color='white'/>:'Submit'}
            </button>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddMovie