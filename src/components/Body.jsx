import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { baseUrl } from '../Utils/constants'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utils/userSlice'
// import Footer from './Footer'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => { store.user });
    const fetchUser = async () => {
        if (userData) return;
        // fetch user details and set in redux store
        try {
            const res = await axios.get(baseUrl + "/profile/view", { withCredentials: true }
            );
            console.log("profile api", res.data);

            dispatch(addUser(res.data))
        } catch (error) {
            if (error.status === 401) {
                Navigate("/login");
            }
            console.log(error);


        }

    };
    useEffect(() => {
        if (!userData) {
            fetchUser();
        }

    }, []);
    return (
        <div>
            <NavBar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Body
