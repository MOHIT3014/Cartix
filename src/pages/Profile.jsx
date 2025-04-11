import React from "react";
import { useState, useEffect } from "react";


function ProfileTabs({ userData }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    console.log("userData", userData)
    return (
        <div className="d-flex align-items-start p-3">
            <div
                className="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                >
                    My Profile
                </button>
                <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                >
                    My Orders
                </button>
                <button
                    className="nav-link"
                    id="v-pills-orders-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-orders"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-orders"
                    aria-selected="false"
                >
                    Address
                </button>
                {/* <button
                    className="nav-link"
                    id="v-pills-wishlist-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-wishlist"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-wishlist"
                    aria-selected="false"
                >
                    Wishlist
                </button> */}
                <button
                    className="nav-link"
                    id="v-pills-bank-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-bank"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-bank"
                    aria-selected="false"
                >
                    Bank Details
                </button>
                <button
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                >
                    Settings
                </button>
            </div>

            <div className="tab-content flex-grow-1" id="v-pills-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                >
                    <h4>My Profile</h4>
                    <div className="card" style={{ width: "25rem" }}>
                        <img
                            src={userData.image}
                            className="card-img-top"
                            alt="Product"
                        />
                        <div className="card-body">
                            <h5 className="card-title fs-4">Name: {userData.firstName}{userData.lastName}</h5>
                            <p className="card-text fs-5">
                                Age: {userData.age}
                            </p>
                            <p className="card-text fs-5">Date of Birth:
                                {userData.birthDate}
                            </p>
                            <p className="card-text fs-5">
                                Gender: {userData.gender}
                            </p>
                            <p className="card-text fs-5">
                                Email: {userData.email}
                            </p>
                            <p className="card-text fs-5">
                                Phone: {userData.phone}
                            </p>

                        </div>
                    </div>

                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                >
                    <h4>Order History</h4>
                    {orders.length === 0 ? (
                        <p>You have no orders yet.</p>
                    ) : (
                        <ul className="list-group">
                            {orders.map((order, index) => (
                                <li key={index} className="list-group-item mb-3">
                                    <p><strong>Order #:</strong> {order.orderNumber}</p>
                                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Total:</strong> ${order.orderTotal}</p>

                                    <ul className="list-group mt-2">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="list-group-item d-flex align-items-center">
                                                <img
                                                    src={item.thumbnail || item.image}
                                                    alt={item.title}
                                                    style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px" }}
                                                />
                                                <div>
                                                    <strong>{item.title}</strong><br />
                                                    {item.quantity} pcs — ${item.total}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-orders"
                    role="tabpanel"
                    aria-labelledby="v-pills-orders-tab"
                >
                    <h4 className="text-body-secondary fw-bold fs-3">Current Address</h4>
                    <div className="card" style={{ width: "25rem" }}>
                        <div className="card-body">

                            <h6 className="card-subtitle mb-2 text-body-secondary fw-bold fs-3">{userData.address.address},</h6>
                            <p className="card-text fw-bold fs-4">{userData.address.city},</p>
                            <p className="card-text fs-4">{userData.address.state}, {userData.address.country}, {userData.address.postalCode}</p>


                        </div>
                    </div>

                </div>

                {/* <div
                    className="tab-pane fade"
                    id="v-pills-wishlist"
                    role="tabpanel"
                    aria-labelledby="v-pills-wishlist-tab"
                >
                    <h4>Wishlist</h4>
                    <p>Your wishlist is empty. Start shopping now!</p>
                </div> */}
                <div
                    className="tab-pane fade"
                    id="v-pills-bank"
                    role="tabpanel"
                    aria-labelledby="v-pills-bank-tab"
                >
                    <h4 className="text-body-secondary fw-bold fs-3">Card Details</h4>
                    <div className="card" style={{ width: "25rem" }}>
                        <div className="card-body">

                            <p className="mb-1 fs-5"><strong>Cardholder Name:</strong> {userData.firstName}</p>
                            <p className="mb-1 fs-5"><strong>Card Number:</strong> {userData.bank.cardNumber}</p>
                            <p className="mb-1 fs-5"><strong>Expiry Date:</strong> {userData.bank.cardExpire}</p>
                            <p className="mb-0 fs-5"><strong>Currency:</strong> {userData.bank.currency}</p>
                            <p className="mb-0 fs-5"><strong>Card Type:</strong> {userData.bank.CardType}</p>


                        </div>
                    </div>

                </div>

                <div
                    className="tab-pane fade"
                    id="v-pills-settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                >
                    <h4>Account Settings</h4>
                    <p>Change your password, manage preferences, and more.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileTabs;
