import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        } else {
            setCart({ products: [] });
        }
    }, []);

    useEffect(() => {
        if (cart !== null) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const fetchUserCart = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.id) return;

        try {
            const res = await fetch(`https://dummyjson.com/carts/user/${user.id}`);
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

    const addToCart = async (pid, quantity = 1) => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!user || !user.id) {
                console.error("User not logged in or userId missing");
                return;
            }

            // Send to API with quantity 1 only (as per click)
            const res = await fetch('https://dummyjson.com/carts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    products: [{ id: pid, quantity: 1 }],
                }),
            });

            const data = await res.json();
            if (data.message) {
                console.error(data.message);
            } else {
                setCart(prevCart => {
                    const updatedCart = prevCart ? { ...prevCart } : { products: [] };
                    const existingProductIndex = updatedCart.products.findIndex(item => item.id === pid);

                    if (existingProductIndex > -1) {
                        // ✅ Increment quantity by 1
                        updatedCart.products[existingProductIndex].quantity += 1;
                    } else {
                        // ✅ Add new item with quantity 1
                        updatedCart.products.push({ id: pid, quantity: 1 });
                    }

                    return updatedCart;
                });

                console.log("Cart updated:", data);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };


    const clearCart = () => {
        setCart({ products: [] });
        localStorage.removeItem('cart');
    };



    return (
        <CartContext.Provider value={{ setCart, cart, addToCart, clearCart, fetchUserCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
