import img from "../../../../assets/images/engin-akyurt-g-m8EDc4X6Q-unsplash 1.jpg";
export default function Examples() {
  return (
    <div className="flex flex-col lg:flex-row py-28 sm:py-52 gap-10 justify-center p-4 bg-pink-50/90">
      <img
        className="w-2/3 mx-auto lg:mx-0 lg:w-auto"
        src={img}
        alt="fresh healthy facial treatment"
      />
      <div className="w-2/3 lg:w-[375px] mx-auto lg:mx-0">
        <h3 className="text-3xl font-bold ">
          Let us handle your screen{" "}
          <span className="text-pink-600">Professionally</span>
        </h3>
        <p className="mt-5 mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          voluptatem voluptatibus, consequuntur nemo ea aut accusantium
          excepturi necessitatibus incidunt modi.
        </p>
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-pink-500 ">500+</span>
            <span className="font-semibold">Happy Customers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-pink-500">16+</span>
            <span className="font-semibold">Total Services</span>
          </div>
        </div>
      </div>
    </div>
  );
}
