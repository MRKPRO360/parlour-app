import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../Context/AuthContext";
export default function ServicesModal({ clickedService, setClickedService }) {
  const { currentuser, logout } = useAuth();
  const { name, price, _id, img, description } = clickedService;
  const navigate = useNavigate();

  const handleBookingSubmit = async function (e) {
    try {
      e.preventDefault();
      const booking = {
        serviceName: name,
        email: currentuser?.email,
        purchaserName: currentuser?.displayName,
        bookedDate: new Date().toDateString(),
        serviceID: _id,
        phone: e.target.phone.value,
        bookedImg: img,
        description,
        price,
      };

      if (!currentuser) {
        toast.error("Please login to add a book ):", {
          duration: 3000,
        });
        return navigate("/login");
      }

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
        },
        body: JSON.stringify(booking),
      };

      const createBook = async function () {
        const res = await fetch("http://localhost:5000/bookings", config);

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("parlour-token");

          logout();
          navigate("/login");
        }

        const data = await res.json();

        if (data.insertedId) {
          setClickedService({});
          toast.success("Booking confirmed!");
        }

        if (res.status === 404) {
          setClickedService({});
          toast.error(data.message);
        }
      };

      createBook();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <input type="checkbox" id="services-modal" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor="services-modal"
            className="absolute flex justify-center w-8 h-8 text-2xl font-bold text-white bg-pink-600 rounded-full cursor-pointer right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="font-semibold">Service Price: ${price}</p>

          <form className="mt-4 space-y-4" onSubmit={handleBookingSubmit}>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                defaultValue={currentuser?.displayName}
                readOnly
              />
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="w-full input input-bordered "
                defaultValue={currentuser?.email}
                readOnly
              />
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                className="w-full input input-bordered"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <button className="w-full btn-primary btn-primary-full btn-tall">
              Confirm Book!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
