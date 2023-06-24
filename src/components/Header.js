import React, { useContext } from 'react'
import EnhancedEncryptionRoundedIcon from '@mui/icons-material/EnhancedEncryptionRounded';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {Appstate} from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className="sticky z-10 header top-0 text-3xl flex justify-between items-center text-red-500 font-bold border-b-2 p-3 border-gray-100 ">
       <Link to={'/'}><span> Movies<span className='text-white'>Mania</span></span> </Link>
       { useAppstate.login ?
       <Link to={'/addmovie'}>
       <h1 className="text-lg flex items-center cursor-pointer">
       <Button variant="contained" color="success"><EnhancedEncryptionRoundedIcon className='mr-1' color='inherit' />
       Add New </Button>
        </h1> </Link> :
        <Link to={'/login'}>
        <h1 className="text-lg flex items-center cursor-pointer">
        <Button variant="contained" color="success">Login</Button>
         </h1> </Link>
       }
    </div>
  )
}

export default Header