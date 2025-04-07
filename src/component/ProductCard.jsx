import { Link } from "react-router-dom";
import './ProductCard.css'
import { useCart } from "../context/cardContext";
function ProductCard({ pid,img, category, title, price, rating }) {
    const { addToCart } = useCart();

    const handleCart = () =>{
        addToCart(pid, 1);
        alert(`${title} has been added to cart!`)
    }

   
    return (
        <>
            <div className="card" style={{ width: "450px" }}>
                <div className="cardImage">
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="details">
                        <div className="content">
                            <Link to="/Details" className="card-link text-decoration-none text-light"><i className="fa-solid fa-eye fs-3"></i></Link>
                        </div>
                    </div>
                <div className="card border-0 ">
                    <button onClick={handleCart}>
                    <div to="/Cart" className="card-link text-dark p-3 bg-dark text-white text-decoration-none  cartSection">
                        <i className="fa-solid fa-cart-shopping  fs-6"> Add to cart</i>
                    </div>
                    </button>
                </div>
                </div>
                <div className="card-body p-5 gap-2">
                    <h5 className="card-title text-uppercase fs-6  p-2  rounded-pill text-center fw-bold bg-secondary text-white">{category}</h5>
                    <h3 className="card-title fs-4 fw-bold">{title}</h3>
                    <p className="card-title fw-bolder fs-4 "> $ {price}</p>
                    <div className="card-body d-flex justify-content-between align-items-center p-0 position-relative overflow-hidden">

                        <i className="fa-solid fa-star full fs-6"> {rating} </i>
                        <div className="viewDetails ">
                            <Link to="" className="text-secondary text-decoration-none p-3">View Details</Link>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )

}

export default ProductCard;