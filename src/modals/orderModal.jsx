// OrderSuccessModal.js
import React from 'react';


const OrderSuccessModal = ({ show, onClose }) => {
    return (
        <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Order Placed</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Your order has been placed successfully!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={onClose}>Okay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;
