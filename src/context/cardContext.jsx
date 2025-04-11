import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import OrderModal from '../modals/orderModal'

const CartContext = createContext();

export const CartProvider = ({ children, userData }) => {
    const [cart, setCart] = useState(null);
    const [counter, setCounter] = useState(0);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        const savedUser = JSON.parse(sessionStorage.getItem('user'));

        if (savedCart) {
            setCart(savedCart);
            setCounter(savedCart.products?.length || 0);
        } else {
            setCart({ products: [] });
            setCounter(0);
        }

        if (savedUser) {
            setUser(savedUser);
        }
    }, []);


    useEffect(() => {
        if (cart !== null) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);


    const fetchUserCart = async () => {
        const userFromSession = JSON.parse(sessionStorage.getItem("user"));
        if (!userFromSession || !userFromSession.id) return;

        try {
            const res = await fetch(`https://dummyjson.com/carts/user/${userFromSession.id}`);
            const data = await res.json();

            if (data.carts && data.carts.length > 0) {
                setCart(data.carts[0]);
            } else {
                setCart({ products: [] });
            }
        } catch (err) {
            console.error("Error fetching user cart:", err);
            setCart({ products: [] });
        }
    };


    const addToCart = async (pid, quantity) => {
        let currentUser = user;

        if (!currentUser) {
            const savedUser = JSON.parse(sessionStorage.getItem('user'));
            if (savedUser) {
                currentUser = savedUser;
                setUser(savedUser);
            }
        }

        if (!currentUser || !currentUser.id) {
            toast.error("Please login to add items to cart");
            return;
        }

        try {
            const res = await fetch('https://dummyjson.com/carts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    products: [{ id: pid, quantity }],
                }),
            });

            const data = await res.json();

            if (res.ok && data.products && data.products[0]) {
                const newProduct = data.products[0];

                const existingIndex = cart.products.findIndex(p => p.id === newProduct.id);

                let updatedProducts;

                if (existingIndex !== -1) {

                    updatedProducts = cart.products.map((p, index) =>
                        index === existingIndex
                            ? {
                                ...p,
                                quantity: p.quantity + newProduct.quantity,
                                total: p.total + newProduct.total,
                            }
                            : p
                    );
                } else {

                    updatedProducts = [...cart.products, newProduct];
                }

                setCart({ ...cart, products: updatedProducts });
                setCounter(prev => prev + 1);
                toast.success("Product added to cart!");
            }
        } catch (err) {
            console.error("Failed to add to cart:", err);
            toast.error("Something went wrong. Try again.");
        }
    };


    const removeFromCart = (pid) => {
        if (!cart || !cart.products) return;

        const productToRemove = cart.products.find(p => p.id === pid);
        if (!productToRemove) return;

        // Filter out the removed product
        const updatedProducts = cart.products.filter(product => product.id !== pid);

        // Reduce counter by quantity of the removed product
        setCounter(prev => Math.max(0, prev - 1));

        setCart({ ...cart, products: updatedProducts });
        toast.info("Product removed from cart");
    };


    function handleCheckOut() {
        if (!cart || cart.products.length === 0) {
            toast.warning("Oops! Your cart is empty. Add some goodies first.");
            return;
        }

        const order = {
            userID: userData.id,
            orderNumber: Math.floor(100000 + Math.random() * 900000),
            orderDate: new Date(),
            orderTotal: cart.products.reduce((sum, item) => sum + item.total, 0),
            items: cart.products,
            status: "pending"
        };
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

        
        const updatedOrders = [...existingOrders, order];

        
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        alert("🎉 Thank you for your purchase!\n\nYour order has been placed successfully and is being processed.\nWe'll keep you updated. Happy shopping! 🛒");

        setCart({ products: [] });
        localStorage.removeItem('cart');
        setCounter(0);
    }




    return (
        <CartContext.Provider
            value={{
                setCart,
                cart,
                addToCart,
                fetchUserCart,
                removeFromCart,
                counter,
                handleCheckOut
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
