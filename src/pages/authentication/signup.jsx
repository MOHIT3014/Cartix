import React from "react";
import { Link } from "react-router-dom";


function Signup() {

    function handleSignup(e) {
        e.preventDefault()
        const name = e.target.name.value;
        const username = e.target.Username.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;

        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: name,
                Username: username,
                Email: email,
                Phone: phone,
                Password: password,
            })
        })
            .then(res => res.json())
            .then(alert("account created successfully"));

    }



    return (
        <div className="d-flex justify-content-center align-items-center vh-80 bg-light">
            <div className="card shadow-lg p-4 border-0" style={{ width: "500px" }}>
                <h2 className="text-center mb-4 text-primary fw-bold">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter your name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Enter your email" name="Username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter your email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone No</label>
                        <input type="phone" className="form-control" placeholder="Enter your phone number" name="phone" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Create a password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-1">Already have an account?</p>
                    <Link to="/login" className="text-decoration-none fw-bold text-primary">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
