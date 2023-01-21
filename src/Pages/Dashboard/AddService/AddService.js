import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function AddService() {
  const { currentuser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddService = async function (data) {
    try {
      const { title, textbox, upload, price } = data;
      const image = upload[0];
      const formData = new FormData();
      formData.append("image", image);

      const config = {
        method: "POST",
        body: formData,
      };

      const imgBbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageHostKey}`,
        config
      );

      const imgBbData = await imgBbRes.json();
      if (imgBbData.success) {
        const service = {
          img: imgBbData.data.url,
          name: title,
          description: textbox,
          price,
        };
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("parlour-token")}`,
          },
          body: JSON.stringify(service),
        };
        const res = await fetch("http://localhost:5000/services", config);
        const data = await res.json();

        if (data.acknowledged) {
          toast.success(
            `Hey ${currentuser?.displayName}!, ${title} added successfully`
          );
          navigate("/dashboard/serviceList");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-5 rounded bg-base-100">
      <form
        className="px-5 pb-16 gap-3 flex flex-col xl:flex-row xl:justify-between"
        onSubmit={handleSubmit(handleAddService)}
      >
        <div className=" ">
          <div className="form-control w-96">
            <label className="label" htmlFor="serviceTitle">
              <span className="text-base font-semibold">Service Title</span>
            </label>
            <input
              type="text"
              name="serviceTitle"
              id="serviceTitle"
              placeholder="Enter Title"
              className="w-full max-w-lg input input-bordered"
              {...register("title", { required: true })}
            />
            {errors?.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>

          <div className="form-control w-96">
            <label className="label" htmlFor="description">
              <span className="text-base font-semibold">Description</span>
            </label>
            <textarea
              type="textarea"
              rows="4"
              name="description"
              id="description"
              placeholder="Your description goes here..."
              className="w-full max-w-lg textarea input-bordered"
              {...register("textbox", { required: true })}
            ></textarea>
            {errors?.textbox && (
              <p className="text-red-500">Description is required</p>
            )}
          </div>
        </div>
        <div className="space-y-4 relative">
          <div className="form-control w-96 ">
            <label className="label" htmlFor="uploadImage">
              <span className="text-base font-semibold ">Upload Image</span>
            </label>

            <label htmlFor="uploadImage" className="absolute cursor-pointer">
              <FaCloudUploadAlt
                className=" text-pink-600 text-3xl
              absolute top-12 left-5 "
              />
              <span
                className="absolute
              block top-12 left-16 "
              >
                Upload
              </span>
            </label>

            <input
              type="file"
              name="uploadImage"
              id="uploadImage"
              placeholder="Enter Title"
              className="w-full max-w-lg input input-bordered invisible"
              {...register("upload", { required: true })}
            />
            {errors?.upload && (
              <p className="text-red-500">Img must be provided</p>
            )}
          </div>

          <div className="form-control w-96 ">
            <label className="label" htmlFor="price">
              <span className="text-base font-semibold ">Choose Price</span>
            </label>

            <select
              className="select select-bordered w-full"
              {...register("price")}
            >
              <option selected value="8.99">
                8.99
              </option>
              <option value="9.99">9.99</option>
              <option value="11.99">11.99</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary btn-primary-full btn-short "
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
