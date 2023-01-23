import { useQuery } from "@tanstack/react-query";
import Service from "../../Home/Home/Services/Services/Service";
import Spinner from "../../Shared/Spinner";

export default function ManageServices() {
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://parlour-server-mrkpro360.vercel.app/services"
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="mb-32">
      <h2 className="text-3xl font-bold text-center">
        All <span className="text-pink-600">Services</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-5 my-14">
        {isLoading && <Spinner />}
        {isError && "An unknown error has occured ): Try to reload the page."}

        {services.map((service, i) => (
          <Service key={i} service={service} isAdmin={true} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
