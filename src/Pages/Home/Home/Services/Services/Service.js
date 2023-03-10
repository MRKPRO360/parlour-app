import { toast } from "react-hot-toast";

export default function Service({
  service,
  setClickedService,
  isAdmin = false,
  refetch = null,
}) {
  const { img, name, description } = service;
  const handleDelete = async function (service) {
    try {
      const confirm = window.confirm(`Do you want to delete ${service.name}?`);

      if (!confirm) return;
      const config = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
        },
      };
      const res = await fetch(
        `https://parlour-server-mrkpro360.vercel.app/services/${service._id}`,
        config
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success(`${service.name} deleted successfully`, {
          duration: 2500,
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{ borderRadius: "6px" }}
      className="shadow-lg shadow-pink-200/80 card w-96 bg-base-100 "
    >
      <figure className="px-10 pt-10">
        <img className="w-16 h-16 rounded" src={img} alt={name} />
      </figure>
      <div className="items-center text-center card-body">
        <h2 className="card-title">{name}</h2>
        <p className="min-h-[72px]">{description}</p>
        <div className="mt-2 card-actions">
          {!isAdmin ? (
            <label
              onClick={() => setClickedService(service)}
              htmlFor="services-modal"
              className="cursor-pointer btn-primary btn-primary-full btn-short"
            >
              Book Now
            </label>
          ) : (
            <label
              onClick={() => handleDelete(service)}
              htmlFor="services-modal"
              style={{ color: "white" }}
              className="cursor-pointer btn btn-error btn-short"
            >
              Delete
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
