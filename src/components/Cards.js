import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';
import { TailSpin } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';


const Cards = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        async function getData(){
            setLoading(true);
            const movdata = await getDocs(moviesRef);
            movdata.forEach((doc) => {
                setData((prev)=>[...prev,{...doc.data(),id:doc.id}]);
            });
            setLoading(false);
        }
        getData();
    },[]);

  return (
    <div className='flex flex-wrap px-3 mt-2 justify-center'> 
      { loading ?<div className='flex w-full h-96 justify-center items-center'><TailSpin height={100} color='white'/></div>:
      data.map((ele,i)=>{
        return (
        <Link to={`./details/${ele.id}`} key={i}>
        <div  className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500
        rounded-md mr-5'>
          <img className='h-60 md:h-72' src={ele.image} alt=""  height={60} width={200}/>
          <h1><span className='text-gray-500'>Name : </span>{ele.title}</h1>
          <h1 className='flex items-center'><span className='text-gray-500 mr-1'>Rating : </span>
          <ReactStars 
             half={true}
             size ={20}
             edit ={false}
             value={ele.rating/ele.rated}
          />
          </h1>
          <h1><span className='text-gray-500'>Year : </span>{ele.year}</h1>
        </div>
        </Link>
        )
       })}
    </div>
  )
}

export default Cards