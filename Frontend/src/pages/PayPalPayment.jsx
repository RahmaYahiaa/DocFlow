import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PayPalPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadPayPalScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AeO4d69TBzwn-Y7Bx1xtPZg5vNMbt_M0c4yoygra6qCmzQQ4L9_w52a6X7z3hqsAE4wh-Fz-qvU9HglY&currency=USD';
      script.addEventListener('load', () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '10.00' // Replace with the actual amount
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert('Transaction completed by ' + details.payer.name.given_name);
              navigate('/my-appointments'); // Redirect to appointments page after payment
            });
          }
        }).render('#paypal-button-container');
      });
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalPayment;