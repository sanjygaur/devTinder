import React, { use } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUser } from "./Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./Utils/constants";

const Login = () => {
    const [email, setEmail] = React.useState('mahesh@gmail.com');
    const [password, setPassword] = React.useState('Mahesh@123');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        // Implement login logic here
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const res = await axios.post(`${baseUrl}/login`,
                { email, password },
                { withCredentials: true });

            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate('/');

        } catch (error) {
            console.error('Login error:', error);
        }


    };
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-500 w-96 shadow-sm">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Login</h2>

                    {/* Form section - left-aligned label */}
                    <div className="form-control w-full max-w-xs text-left my-2">
                        <label className="label">
                            <span className="label-text">Email Id:</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs text-left my-2">
                        <label className="label">
                            <span className="label-text">Password:{password}</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="card-actions justify-center">
                        <button className="btn border-t-cyan-400" onClick={handleLogin}>
                            Login Button
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
