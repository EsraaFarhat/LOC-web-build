import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { url } from "../../constants";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { token, userId } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const { clientSecret, setConfirmedTagNum } = props;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const confirmPaymentForTags = (paymentIntentId) => {
    axios
      .patch(
        `${url}/api/users/buy-tags`,
        {
          payment_id: paymentIntentId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        toast(err.message);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      toast(result.error.message);
    } else {
      confirmPaymentForTags(result.paymentIntent.id);
      toast.success(result.paymentIntent.status, {
        duration: 1000,
        onClose: () => {
          navigate("/users");
        },
      });
      // console.log(result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <CardElement
          className="form-control p-3"
          options={{ hidePostalCode: true }}
        />
      </div>
      <div className="flex justify-center">
        <button
          disabled={!stripe}
          type="button"
          className="btn btn-outline-secondary m-3"
          onClick={() => {
            setConfirmedTagNum(false);
          }}
        >
          Edit
        </button>
        <button
          disabled={!stripe}
          type="submit"
          className="btn btn-success m-3"
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
