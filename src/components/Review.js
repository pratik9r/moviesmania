import { Button } from '@mui/material';
import { addDoc,doc,updateDoc,query,where,getDocs } from 'firebase/firestore';
import React, { useState ,useEffect,useRef} from 'react'
import { TailSpin,ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import swal from 'sweetalert';
import { reviewRef,db } from '../firebase/firebase';
import { useContext } from 'react';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';


const Review = ({id,userrating,userrated}) => {
  const inputRef = useRef(null);
  const userN = useContext(Appstate);
  const [rating,setRating] = useState(0);
  const [loading,setLoading] = useState(false);
  const [useloading,setReviewLoading] = useState(false);
  const [data,setData] = useState([]);
  const [form1,setForm1] = useState(""); 
  const [newAdded, setNewAdded] = useState(0);
  const navigate = useNavigate();

  const addReview =async() =>{
    setLoading(true);
      try {
        if(userN.login){
        await addDoc(reviewRef,{
          movieId:id,
          thoughts:form1,
          rating:rating,
          name:userN.user,
          timestamp: new Date().getTime()
        });

        const ref = doc(db,"movies",id);
        await updateDoc(ref,{
          rating: userrating + rating,
          rated: userrated + 1
        })
        setForm1("hello")
        setRating(0);
        setNewAdded(newAdded + 1);
        inputRef.current.value = "";
        swal({
          title: " Review successfully added",
          icon: "success",
          buttons: false,
          timer: 3000
        })
      }else{
        navigate('/login');
      }
        
      } catch (error) {
        swal({
          title: error,
          icon: "error",
          buttons: false,
          timer: 3000
        })
      }
      setLoading(false);
  }

  useEffect(()=>{
    
    async function getData(){
      setReviewLoading(true);
      let quat = query(reviewRef,where('movieId',"==",id));
      setData([]);
      const quedata = await getDocs(quat);
      quedata.forEach((doc)=>{
        setData((prev)=>[...prev,doc.data()]);
      })
      setReviewLoading(false);
    }
    getData();
   },[newAdded])

  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
        <ReactStars 
            className='mt-3'
            half={true}
            size ={40}
            value={rating}
            onChange={(rate)=>setRating(rate)}
        />
        <input  placeholder='share your thoughts..' className='w-full p-2 outline-none header text-white' value={form1.thoughts}
        onChange={(ec)=>setForm1(ec.target.value)} ref={inputRef}/>
        <Button variant="contained" color="success"  className='w-full p-1 mt-2' onClick={addReview}>
         {loading?<TailSpin height={25} color='white'/>:'Share'} 
        </Button>
    
    {
      useloading ? <div className='mt-6 flex justify-center'> <ThreeDots height={25} color='white' /></div>:
      <div>
        {data.map((e,i)=>{
            return(
              <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                        <div className='flex items-center'>
                            <p className='text-blue-500'>{e.name}</p>
                            <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={15}
                            half={true}
                            value={e.rating}
                            edit={false}
                        />

                        <p className='text-white'>{e.thoughts}</p>
                    </div>     
            )
        })}
      </div>
    }
    </div>
  )
}

export default Review