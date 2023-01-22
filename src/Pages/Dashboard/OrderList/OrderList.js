import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner";

export default function OrderList() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async function () {
      try {
        const res = await fetch("http://localhost:5000/bookingsForAdmin", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
          },
        });
        const data = res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="px-3 overflow-x-auto">
      {isLoading && <Spinner />}
      {isError && "An unknown error has occured ): Try to reload the page."}

      <table className="table w-full ">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, i) => (
            <tr key={order._id}>
              <td>{i + 1}</td>
              <td>{order.purchaserName}</td>
              <td>{order.email}</td>
              <td>{order.serviceName}</td>
              <td>${order.price}</td>
              <td>
                {order.paid ? (
                  <span className="px-1 py-[3px] rounded text-gray-100 bg-green-400 font-semibold shadow-sm shadow-green-300">
                    Paid
                  </span>
                ) : (
                  <span className="px-1 py-[3px] rounded text-white shadow-sm shadow-pink-400 bg-pink-500 font-semibold">
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
