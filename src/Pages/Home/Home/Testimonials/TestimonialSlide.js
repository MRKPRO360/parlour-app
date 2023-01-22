import { BsStarFill } from "react-icons/bs";
function TestimonialSlide({ img, text, client, corporation }) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex gap-2 items-center">
        <img
          className="w-16 h-16 rounded-full object-cover object-center shadow-md shadow-pink-300/90"
          src={img}
          alt="avatar"
        />
        <div className="flex-col flex gap-1">
          <p className="font-semibold text-lg ">{client}</p>
          <span>{corporation}</span>
        </div>
      </div>
      <p className="my-4 min-h-[96px]">{text}</p>
      <div className="flex items-center gap-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <BsStarFill className="text-amber-500" key={i} />
          ))}
      </div>
    </div>
  );
}

export default TestimonialSlide;
