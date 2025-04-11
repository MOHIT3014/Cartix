import { useCart } from "../context/cardContext";

function CartPage() {
    const { cart,removeFromCart,handleCheckOut } = useCart();
    

    if (!cart || !cart.products || cart.products.length === 0) {
        return (
            <div>
                <h1>Your cart is empty.</h1>
            </div>
        );
    }

    let cartTotal = 0;
    console.log(cart);

    cart.products.forEach(product => {
        cartTotal += product.total;
    });

    // function handleCheckOut(){
    //     const order = {
    //         userID : userData.id, 
    //         orderNumber :Math.floor(100000 + Math.random() * 900000),
    //         orderDate : new Date(),
    //         orderTotal : cartTotal,
    //         items : cart,
    //         status :"pending"

    //     }
    //     console.log(order)
    // }

    return (
        <>
            <div className="container">
                <h1 className="text-center">Cart</h1>
                <div className="col-xl-10 m-auto p-5">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={product.thumbnail} alt={product.title} width="80" />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.total}</td>
                                    <td>{product.quantity}</td>
                                    <td><button className="btn btn-danger" onClick={() => removeFromCart(product.id)}><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2"></td>
                                <td className="text-end fw-bold">Total:</td>
                                <td className="fw-bold">{cartTotal}</td>
                                <div className="btn btn-primary rounded text-light fw-bold bg-primary" onClick={handleCheckOut}>
                                checkout
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CartPage;
