import { Link } from "react-router-dom";
import './layout.css';
import { useCart } from "../context/cardContext";

function Navbar({ userData, onLogout }) {
    const { cart } = useCart();

    // Fallback to empty cart if undefined/null
    const cartCount = cart?.products?.reduce((total, item) => total + item.quantity, 0) || 0;

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">
                        <img src="/src/assets/logo.svg" alt="Bootstrap" width="120" height="60" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end gap-5" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 text-uppercase">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="#">Pages</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="#">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle fs-5" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Collection
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle fs-5" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Mega Store
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="#">Contact</Link>
                            </li>
                        </ul>
                        <div className="d-flex ms-3 gap-3">
                            <div className="user p-2 border rounded-pill border-dark d-flex justify-content-center align-items-center gap-2">
                                <Link className="nav-link" to="/login">
                                    <i className="fa-solid fa-user text-secondary fs-4"></i>
                                </Link>
                                <Link className="nav-link fs-5 text-uppercase" to="/login">
                                    {userData && userData.firstName }
                                </Link>
                            </div>
                            <div className="user p-2 border rounded-pill border-dark d-flex justify-content-center align-items-center gap-2"
                                onClick={onLogout}>
                                <i className="fa-solid fa-right-from-bracket fs-4"></i>
                            </div>
                            <div className="cart p-2 border rounded-pill border-dark position-relative">
                                <Link className="nav-link" to="/cart">
                                    <i className="fa-solid fa-cart-shopping text-secondary fs-4"></i>
                                    <span className="badge bg-danger counter">{cartCount}</span>
                                </Link>
                            </div>
                            <div className="cart p-2 border rounded-pill border-dark">
                                <Link className="nav-link" to="/search">
                                    <i className="fa-solid fa-magnifying-glass text-secondary fs-4"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
