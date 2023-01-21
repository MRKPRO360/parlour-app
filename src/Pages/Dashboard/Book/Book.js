import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import Spinner from "../../Shared/Spinner";
import CheckoutForm from "./CheckoutForm";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

export default function Book() {
  const { id } = useParams();
  const { currentuser } = useAuth();
  const email = currentuser?.email;

  const {
    data: book = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book"],
    queryFn: async function () {
      try {
        const res = await fetch(
          `http://localhost:5000/bookings/${id}?email=${email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { purchaserName, email: userEmail, serviceName } = book;

  return (
    <div className="px-3 ">
      {isLoading && <Spinner />}
      <div className="w-3/4 mx-auto">
        <div className="space-y-5">
          {isError && "An unknown error has occured ): Try to reload the page."}
          <div className="flex items-center gap-1">
            <BiPurchaseTagAlt className="text-2xl text-pink-600 sm:text-xl" />
            <h1 className="text-lg font-semibold">
              You are paying for {serviceName}
            </h1>
          </div>
          <h2 className="text-lg font-semibold sm:text-xl">User Information</h2>
          <div className="flex items-center gap-1 outline-none">
            <BsPerson className="text-xl text-pink-600" />
            <input
              type="text"
              className="w-full outline-none"
              defaultValue={purchaserName}
              readOnly
            />
          </div>
          <div className="flex items-center gap-1 outline-none">
            <MdOutlineEmail className="text-xl text-pink-500" />
            <input
              type="text"
              className="w-full outline-none"
              defaultValue={userEmail}
              readOnly
            />
          </div>
        </div>
        <div className="my-8 rounded-md shadow-md shadow-pink-200/60">
          <Elements stripe={stripePromise}>
            <CheckoutForm book={book} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
