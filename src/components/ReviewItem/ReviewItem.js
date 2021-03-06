import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key} = props.product;
    const removeProduct = props.removeProduct;
    const styleReview = {
        borderBottom: "1px solid lightGray",
        marginBottom: "5px",
        paddingBottom: '5px',
        marginLeft: '50px'
    }
    return (
        <div style={styleReview}>
            <h3>{name}</h3>
            <p>Quantity: {quantity}</p>
            <button 
            onClick= {() => removeProduct(key)}
            className="main-button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;