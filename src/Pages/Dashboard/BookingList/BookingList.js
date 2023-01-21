import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import Spinner from "../../Shared/Spinner";
import BookingItem from "./BookingItem";
export default function BookingList() {
  const { currentuser } = useAuth();
  const email = currentuser?.email;
  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["bookings", email],
    queryFn: async function () {
      const res = await fetch(`http://localhost:5000/bookings?email=${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="justify-self-start">
      {isLoading && <Spinner />}
      {isError && "An unknown error has occured ): Try to reload the page."}

      {bookings.length < 1 && (
        <span className="text-xl font-semibold">
          There is no items to show in the cart. Please add some{" "}
          <Link
            className="underline decoration-2 decoration-pink-500"
            to="/services"
          >
            services
          </Link>{" "}
          to show in your cart.
        </span>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {bookings.length > 0 &&
          bookings?.map((book) => (
            <BookingItem
              key={book._id}
              id={book._id}
              book={book}
              refetch={refetch}
            />
          ))}
      </div>
    </div>
  );
}
