export default function Service({ service, setClickedService }) {
  const { img, name, description } = service;

  return (
    <div className="shadow-xl card w-96 bg-base-100 ">
      <figure className="px-10 pt-10">
        <img className="w-16 h-16 rounded" src={img} alt={name} />
      </figure>
      <div className="items-center text-center card-body">
        <h2 className="card-title">{name}</h2>
        <p className="min-h-[72px]">{description}</p>
        <div className="card-actions">
          <label
            onClick={() => setClickedService(service)}
            htmlFor="services-modal"
            className="btn-primary btn-primary-full btn-short cursor-pointer"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
}
