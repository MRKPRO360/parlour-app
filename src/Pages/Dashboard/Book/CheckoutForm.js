import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutForm({ book }) {
  const { price, purchaserName, email, _id } = book;
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuceess] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch(`http://localhost:5000/create-payment-intent?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [email, price]);

  const handleSubmit = async function (e) {
    e.preventDefault();
    setSuceess("");
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: purchaserName,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookId: _id,
      };

      fetch(`http://localhost:5000/payments?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuceess("Congrats! Your payment is completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
  };

  return (
    <div className="px-3 py-8 bg-white rounded">
      <form>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#42770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <div className="flex items-center gap-4 mt-8">
          <h3 className="text-base font-semibold sm:text-lg">
            Your service charge will be ${price}
          </h3>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn-primary btn-primary-full btn-tiny sm:btn-short"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-base text-red-500 sm:text-lg">{cardError}</p>
      )}

      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </div>
  );
}
