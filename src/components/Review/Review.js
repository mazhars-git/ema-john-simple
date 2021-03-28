import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thankfulImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
       history.push('/shipment')
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://dry-journey-54702.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[]);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={thankfulImage} alt=""/>
    }

    return (
        <div className="shop-container">
           <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        product={pd}
                        key ={pd.key}
                        removeProduct = {removeProduct}
                    ></ReviewItem>)
                }
                {thankyou}
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
               </Cart>
           </div>
           
        </div>
    );
};

export default Review;