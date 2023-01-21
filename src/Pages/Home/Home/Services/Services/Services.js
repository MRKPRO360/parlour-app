import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Spinner from "../../../../Shared/Spinner";
import ServicesModal from "../ServicesModal/ServicesModal";
import Service from "./Service";

export default function Services() {
  const [clickedService, setClickedService] = useState({});
  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/services");
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
        Our Awesome <span className="text-pink-600">Services</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-5 my-14">
        {isLoading && <Spinner />}
        {isError && "An unknown error has occured ):. Try to reload the page."}

        {services.map((service, i) => (
          <Service
            key={i}
            service={service}
            setClickedService={setClickedService}
          />
        ))}
      </div>

      {clickedService.name && (
        <ServicesModal
          clickedService={clickedService}
          setClickedService={setClickedService}
        />
      )}
    </div>
  );
}
