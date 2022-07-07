import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm";
import { url } from "../../constants";

const stripePromise = loadStripe(
  "pk_test_51IXkSpCm8y7Wcgvv7VxqDEe0hnvipljobtdO9cPO4Y5rHMR1mqw50fEslMYY2vuK01rdrSLtmU3r52FRlnxzDg8u00iLdbxyGt"
);

function BuySuperUserTags() {
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
    if (numOfTags == 2000) {
      setMoneyAmount(600);
    } else if (numOfTags == 5000) {
      setMoneyAmount(1380);
    } else if (numOfTags == 7500) {
      setMoneyAmount(1800);
    } else if (numOfTags == 25000) {
      setMoneyAmount(5400);
    } else if (numOfTags == 50000) {
      setMoneyAmount(9000);
    }
  }, [numOfTags]);

  const getClientSecret = () => {
    axios
      .post(
        `${url}/api/users/create-payment-intent`,
        {
          amount: moneyAmount,
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
                <label htmlFor="inputTag" className="w-8/12 col-form-label">
                  Choose LOC license category
                </label>
                <div
                  className="w-4/12"
                  onChange={(e) => setNumOfTags(e.target.value)}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="2000"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Business Basic 2000 LOCs
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="5000"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Bronze 5000 LOCs
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="7500"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Silver 7500 LOCs
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="25000"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Gold 25000 LOCs
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value={50000}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Platinum 50000 LOCs
                    </label>
                  </div>
                  <div className="form-check disabled">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios3"
                      value="0"
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios3"
                    >
                      {`Enterprise > 50000, Conatct "accounts@keltechiot.com"`}
                    </label>
                  </div>
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

export default BuySuperUserTags;
