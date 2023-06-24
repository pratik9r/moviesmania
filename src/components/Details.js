import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { ThreeCircles } from 'react-loader-spinner';
import  {doc,getDoc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import Review from './Review';

const Details = () => {
  const [data,setData] = useState({
    title:"",
    year:"",
    description:"",
    image:"",
    rating:0,
    rated:0
  });
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  
   useEffect(()=>{
         async function getData(){
            setLoading(true);
             const det = doc(db,'movies',id);
             const movdata = await getDoc(det);
             setData(movdata.data());
            setLoading(false);
            
         }
         getData();
  },[])
  return (
    
    <div className='flex justify-center p-4 mt-4 flex-col  item-center md:item-start'>
        { loading ? <div className='h-96 flex w-full justify-center items-center'><ThreeCircles height={30} color="white" /></div> :
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-3 py-14 md:flex-row flex-col mt-2" >
            <div className="h-96 block  w-2/3 mb-10 md:mt-5 justify-center sticky">
            <img className="h-96 block sticky w-full justify-center" alt="hero" src={data.image} />
            </div>
            <div className="md:ml-10 mr-20 ml-0 w-full md:w-full">
            <h1 className="text-5xl font-bold text-gray-400 justify-center">{data.title}
                <span className='text-4xl font-bold'> ({data.year}) </span><br />
                    <ReactStars 
                        className='mt-3'
                        half={true}
                        size ={30}
                        edit ={false}
                        value={data.rating/data.rated}
                    />
            </h1>
            <p className="mt-5 text-2xl">{data.description}</p>
            <Review id={id} userrating={data.rating} userrated={data.rated} />
           </div>
          </div>
        </section>
         }
    </div>
    
  )
}

export default Details