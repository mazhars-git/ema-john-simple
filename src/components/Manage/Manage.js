import React from 'react';

const Manage = () => {

    const handleAddProducts = () => {
        const product = {};
        fetch('https://dry-journey-54702.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text"/></p>
                <p><span>Price: </span><input type="text"/></p>
                <p><span>Quantity: </span><input type="text"/></p>
                <p><span>Product Image: </span><input type="file"/></p>
                <button onClick={handleAddProducts}>Add product</button>
            </form>
        </div>
    );
};

export default Manage;