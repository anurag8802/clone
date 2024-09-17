import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
//useSelector: Allows the component to access state values from the Redux store.
//useDispatch: Allows the component to dispatch actions to update the Redux store.
import {useSelector,useDispatch} from "react-redux" 
import { API_END_POINT } from '../utils/constant';
import axios from "axios";//A library used to make HTTP requests.
import { setUser } from '../redux/userSlice';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => { 
    const user = useSelector((store)=>store.app.user);
    const toggle = useSelector(store=>store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();
/**
 Makes an API request to the /logout endpoint to log the user out.
If the response indicates success (res.data.success), it shows a success notification using toast.
Dispatches the setUser(null) action to clear the user from the Redux store.
Navigates the user back to the home page ("/").
If an error occurs during the logout process, it logs the error to the console.
 */
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if(res.data.success){
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
//This function toggles between two states (e.g., showing "Home" or "Search").
    const toggleHandler = () => {
        dispatch(setToggle());
    }
 
    return (
        //here we put netflix logo and design that logo it is constant in both login ,logout and browse
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
            <img className='w-56' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="netflix-logo" />
            {
                //here we put user,logout and search icon and design these icons.....
                user && (
                    <div className='flex items-center'>
                        <IoIosArrowDropdown size="24px" color='white' />
                                                                        //username we design here....
                        <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                        <div className='ml-4'>
                            <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2'>Logout</button>
                            //here if we are at browse page we get search icon and at search page we have home icon.....for this we use toggle from toggleHandler
                            <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 ml-2'>{toggle ? "Home" : "Search"}</button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Header