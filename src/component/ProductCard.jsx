import { useRef } from "react";
import { Link } from "react-router-dom";
import './ProductCard.css';
import { useCart } from "../context/cardContext";

function ProductCard({ pid, img, category, title, price, rating, desc, stock, warranty }) {
    const { addToCart } = useCart();

    const modalRef = useRef();

    const handleCart = () => {
        addToCart(pid, 1);
        alert(`${title} has been added to cart!`);
    };

    return (
        <>
            <div className="card" style={{ width: "450px" }}>
                <div className="cardImage">
                    <img src={img} className="card-img-top" alt={title} />
                    <div className="details">
                        <div className="content">
                            {/* Trigger modal */}
                            <button
                                className="btn text-light"
                                data-bs-toggle="modal"
                                data-bs-target={`#productModal-${pid}`}
                            >
                                <i className="fa-solid fa-eye fs-3"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card border-0">
                        <button onClick={handleCart}>
                            <div className="card-link text-dark p-3 bg-dark text-white text-decoration-none cartSection">
                                <i className="fa-solid fa-cart-shopping fs-6"> Add to cart</i>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="card-body p-5 gap-2">
                    <h5 className="card-title text-uppercase fs-6 p-2 rounded-pill text-center fw-bold bg-secondary text-white">{category}</h5>
                    <h3 className="card-title fs-4 fw-bold">{title}</h3>
                    <p className="card-title fw-bolder fs-4">$ {price}</p>
                    <div className="card-body d-flex justify-content-between align-items-center p-0 position-relative overflow-hidden">
                        <i className="fa-solid fa-star full fs-6"> {rating} </i>
                        <div className="viewDetails">
                            <button
                                className="text-secondary text-decoration-none p-3 bg-transparent border-0"
                                data-bs-toggle="modal"
                                data-bs-target={`#productModal-${pid}`}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id={`productModal-${pid}`}
                tabIndex="-1"
                aria-labelledby={`productModalLabel-${pid}`}
                aria-hidden="true"
                ref={modalRef}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ maxWidth: "60%", height: "600px" }}
                >
                    <div className="modal-content" style={{ height: "100%" }}>
                        <div className="modal-header">
                            
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div
                            className="modal-body text-center overflow-auto d-flex"
                            style={{ maxHeight: "500px" }}
                        >
                            <div className="d-flex justify-content-center align-items-center" style={{ Width: "50%", height: "450px" }}>
                                <img src={img} className="m-auto" alt={title} width={400} height={400} />
                            </div>
                            <div className="text-start" style={{ Width: "50%", height: "450px" }}>
                            <p className="fs-5 text-capitalize text-black  "><strong></strong> {category}</p>
                            <h2 className="fs-1 fw-bold">{title}</h2>
                            <p className="fs-3 fw-bold text-black text-decoration-underline"><strong className="fs-5 text-black fw-300">Price:</strong> ${price}</p>
                            <p className="fs-4 text-black"><strong className="fs-5 text-black">Description:</strong> {desc}</p>
                            <p className="fs-3 text-black"><strong className="fs-5 text-black">Rating:</strong> ⭐ {rating}</p>
                            <p className="fs-3 text-black"><strong className="fs-5 text-black">Stock:</strong> {stock}</p>
                            <p className="fs-3 text-black"><strong className="fs-5 text-black">Warranty:</strong> {warranty}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProductCard;
