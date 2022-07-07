import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm";
import { url } from "../../constants";

const stripePromise = loadStripe(
  "pk_test_51LDV07AoFWV7oCgbIBNbkbVoLrprO4F3h55oPnSZwg9TYgjDLYhczTzDnyLkgyfWo4iBBtY5aFTD78to08mTjXAJ00u7PvEjhn"
);

function UpgradeAdminTags() {
  const [numOfTags, setNumOfTags] = useState(0);
  const [moneyAmount, setMoneyAmount] = useState(0);
  const { token, userId } = useSelector((state) => state.login);
  const [clientSecret, setClientSecret] = useState(null);
  const [confirmedTagNum, setConfirmedTagNum] = useState(false);

  const options = {
    clientSecret: clientSecret,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    setMoneyAmount(numOfTags / 100);
  }, [numOfTags]);

  const getClientSecret = () => {
    axios
      .post(
        `${url}/api/users/create-payment-intent`,
        {
          amount: numOfTags,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        // console.log(response.data);
        setClientSecret(response.data.clientSecret);
      })
      .catch((err) => {
        toast(err.message);
      });
  };
  return (
    <>
      <div className="container flex justify-center">
        <ToastContainer />
        <div className="w-6/12 ">
          <h5 className="modal-title text-center m-3" id="exampleModalLabel">
            {!confirmedTagNum
              ? "Buy New Tags"
              : `Buying ${numOfTags} Tags for ${moneyAmount} €`}
          </h5>
          {!confirmedTagNum ? (
            <form>
              <div className="form-group row">
                <label htmlFor="inputTag" className="w-9/12 col-form-label">
                  Enter The Tag amount
                </label>
                <div className="w-3/12">
                  <input
                    type="number"
                    step={100}
                    min={0}
                    className="form-control"
                    id="numOfTags"
                    placeholder="Tags"
                    value={numOfTags}
                    onChange={(e) => setNumOfTags(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputTagPrice"
                  className="w-9/12 col-form-label"
                >
                  {`The yearly price for the tag amount of ${numOfTags} `}
                </label>
                <div className="w-3/12">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="staticEmail"
                    value={`${moneyAmount} €`}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => {
                    getClientSecret();
                    setConfirmedTagNum(true);
                  }}
                >
                  Confirm
                </button>
              </div>
            </form>
          ) : (
            clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  clientSecret={clientSecret}
                  confirmedTagNum={confirmedTagNum}
                  setConfirmedTagNum={setConfirmedTagNum}
                />
              </Elements>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default UpgradeAdminTags;
