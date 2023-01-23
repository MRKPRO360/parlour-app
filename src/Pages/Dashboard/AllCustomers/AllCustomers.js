import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner";

export default function AllCustomers() {
  const {
    data: customers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async function () {
      try {
        const res = await fetch(
          "https://parlour-server-mrkpro360.vercel.app/users",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
            },
          }
        );
        const data = res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="px-3">
      {isLoading && <Spinner />}
      {isError && "An unknown error has occured ): Try to reload the page."}

      {!isLoading && !isError && (
        <table className="table w-full ">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, i) => (
              <tr key={customer._id}>
                <td>{i + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer?.phoneNumber || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
