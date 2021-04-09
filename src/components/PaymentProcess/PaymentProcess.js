import React from 'react';
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const PaymentProcess = ({handlePayment}) => {
    const stripePromise = loadStripe('pk_test_51Ie6oIB7HII9WgF8Xf5iAX7rMg3Ig0a33Y1CyRKK7AzQmvHemGkgGFPR3jhDduLFrE3pkgs1td0zuJMbgNmEzPEI0095xeijHZ');
    return (
        <div>
            <Elements stripe={stripePromise}>
                    <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            </Elements>
        </div>
    );
};

export default PaymentProcess;