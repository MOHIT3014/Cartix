import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Link } from "react-router-dom";
import { useCart } from "../context/cardContext";
import Loading from '../component/loader'

function Home() {
    const { cart, addToCart } = useCart();
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const limit = 20;

    useEffect(() => {
        fetch(`https://dummyjson.com/products?skip=0&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            
    }, []);

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <div className="text-center">
                        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
                            <Loading/>
                        </div>
                        
                    </div>
                </div>
            ) : (
                <>
                    <div className="heading text-center m-3">
                        <h4 className="fs-2 fw-bold">Best Collection Arrived</h4>
                        <span className="fs-4 font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus maximus vehicula.</span>
                    </div>
                    <div className="pageLink mt-5 mb-4">
                        <ul className="d-flex flex-wrap justify-content-center align-items-center gap-5">
                            <li>
                                <Link to="/bestSelling" className="text-dark text-decoration-none fs-5 fw-bold text-uppercase">Best Selling</Link>
                            </li>
                            <li>
                                <Link to="/handMade" className="text-dark text-decoration-none fs-5 fw-bold text-uppercase">Hand Made Items</Link>
                            </li>
                            <li>
                                <Link to="/topItems" className="text-dark text-decoration-none fs-5 fw-bold text-uppercase">Top 10 Items</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container-fluid d-flex flex-wrap justify-content-center border-0">
                        {product && product.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                pid={product.id}
                                img={product.images[0]}
                                category={product.category}
                                title={product.title}
                                price={product.price}
                                rating={product.rating}
                                desc={product.description}
                                stock={product.stock}
                                warranty={product.warrantyInformation}
                                onAddToCart={() => addToCart(product)}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default Home;
