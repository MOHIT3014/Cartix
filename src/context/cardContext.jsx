import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
    
       
        const updatedProducts = cart.products.filter(product => product.id !== pid);
    
        setCounter(prev => Math.max(0, prev - productToRemove.quantity));
    
        setCart({ ...cart, products: updatedProducts });
        toast.info("Product removed from cart");
    };
    

    const clearCart = () => {
        setCart({ products: [] });
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider
            value={{
                setCart,
                cart,
                addToCart,
                clearCart,
                fetchUserCart,
                removeFromCart,
                counter,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
