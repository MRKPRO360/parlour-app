import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function BookingItem({ book, id, refetch }) {
  const { currentuser } = useAuth();
  const email = currentuser?.email;

  const { bookedImg: img, serviceName, description } = book;

  const handleDelete = async function (service) {
    try {
      const confirm = window.confirm(
        `Do you want to delete the ${service.serviceName}`
      );

      if (!confirm) return;

      const config = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
        },
      };

      const res = await fetch(
        `http://localhost:5000/bookings/${id}?email=${email}`,
        config
      );

      const data = await res.json();
      console.log(data);
      if (data.deletedCount > 0) {
        toast.success(`${service.serviceName} deleted successfully!`, {
          duration: 2500,
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shadow-xl rounded-xl w-80 bg-base-100">
      <div className="card-body">
        <div className="justify-between card-title">
          <img className="w-16 h-16 rounded-full" src={img} alt={serviceName} />
          {book.paid ? (
            <button className="flex items-center px-2 py-1 duration-200 transform rounded-md bg-green-500/60 active:translate-y-1">
              <span className="text-base text-green-700">Paid</span>
            </button>
          ) : (
            <Link
              to={`/book/${id}`}
              className="flex items-center px-2 py-1 transition duration-200 transform rounded-sm bg-pink-500/60 active:translate-y-1"
            >
              <span className="text-base text-pink-700">Pay</span>
            </Link>
          )}
        </div>
        <h3 className="my-2 text-xl font-semibold">{serviceName}</h3>
        <p>{description}</p>
        <button
          onClick={() => handleDelete(book)}
          className="self-start text-white font-semibold px-2 py-1 transition duration-200 transform rounded-md bg-red-500 active:translate-y-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
