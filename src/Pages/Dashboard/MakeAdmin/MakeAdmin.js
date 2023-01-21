import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MakeAdmin() {
  const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
        },
        body: JSON.stringify({ email }),
      };
      const res = await fetch("http://localhost:5000/makeAdmin", config);
      const data = await res.json();

      if (data.modifiedCount > 0) {
        navigate("/");
        toast.success("User role changed to admin 😍");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-5 rounded bg-base-100">
      <form className="flex gap-5 px-5 pb-16 " onSubmit={handleSubmit}>
        <div className="form-control w-96">
          <label className="label" htmlFor="email">
            <span className="text-base font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full max-w-lg input input-bordered"
            required
          />
        </div>
        <button
          type="submit"
          className="self-end btn-primary btn-primary-full btn-tall"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
