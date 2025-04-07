import { useCart } from "../context/cardContext";

function CartPage() {
    const { cart } = useCart();

   
    if (!cart || !cart.products || cart.products.length === 0) {
        return (
            <div>
                <h1>Your cart is empty.</h1>
            </div>
        );
    }

    return (
        <>
            <h1>Product ID: {cart.products[0].id}</h1>
            
            <h2>Products in Cart:</h2>
            <ul>
                {cart.products.map(product => (
                    <li key={product.id}>
                        Product ID: {product.id}, Quantity: {product.quantity}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CartPage;