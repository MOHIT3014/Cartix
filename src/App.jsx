import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import Signup from './pages/authentication/signup';
import Login from './pages/authentication/login';
import { useEffect, useState } from 'react';
import CartPage from './pages/cart';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider, useCart } from './context/cardContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileTabs from './pages/Profile';


function App() {
    const [userData, setUserData] = useState(null);
    // const {fetchUserCart,clearCart} = useCart();
    

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            let uData = JSON.parse(sessionStorage.getItem('user'))
            loginData(uData.accessToken)
        }
    }, []);

    function loginData(data) {
        fetch('https://dummyjson.com/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${data}`,
            },
            redirect: 'follow',
        })
        .then(res => res.json())
        .then(userData => {
            setUserData(userData);
        
            
        })
        .catch(err => {
            console.error("Error fetching user data:", err);
        });
    }

    function handleLogout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        setUserData(null);
        
    }

    return (
        <>
            <BrowserRouter>
                <CartProvider userData = {userData}>
                    <Navbar userData={userData} onLogout={handleLogout} />
                    
                    <Routes>
                        <Route path="/" element={<Home userData={userData} />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/login" element={<Login loginData={loginData} />} />
                        <Route path="/cart" element={<CartPage userData = {userData}/>} />
                        <Route path="/profile" element={<ProfileTabs userData={userData}/>} />

                    </Routes>
                </CartProvider>
            </BrowserRouter>
        </>
    );
}

export default App;