import React, { useState } from "react";
import { Link } from "react-router-dom";


function Login({ loginData }) {
    // const [user, setUser] = useState(null)
    const [error, setError] = useState(null)


    async function handleLogin(e) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value

        const res =await  fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                username: username,
                password: password,

            }),
        });
        console.log(res)
        const data =await res.json()
        if (res.ok) {
            console.log(data);
            loginData(data.accessToken)
            sessionStorage.setItem('token', data.accessToken)
            sessionStorage.setItem('user', JSON.stringify(data));
        }






    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-3 border-0" style={{ width: "550px" }}>
                <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username" name="username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" name="password" />
                    </div>
                    {/* <Link to="/"> */}
                    <button type="submit" className="btn btn-primary w-100" >Login</button>
                    {/* </Link> */}
                </form>
                <div className="text-center mt-3">
                    <Link to="/forgot-password" className="text-decoration-none text-danger">Forgot Password?</Link>
                    <p className="mt-2 mb-0">Don't have an account? <Link to="/Signup" className="fw-bold text-primary">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
