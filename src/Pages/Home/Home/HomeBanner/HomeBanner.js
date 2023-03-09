import img from "../../../../assets/images/beautiful-young-asian-woman-touching-her-clean-face-with-fresh-healthy-skin-isolated-white-wall-beauty-cosmetics-facial-treatment-concept 1.png";
export default function HomeBanner() {
  return (
    <div className="hero mb-20">
      <div
        style={{ gap: "140px" }}
        className="flex-col hero-content lg:flex-row-reverse"
      >
        <img
          src={img}
          alt="beautiful women facializing"
          className="w-3/4 sm:w-2/5 rounded-lg shadow-xl shadow-pink-200/75"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold md:text-5xl">
            <span className="block">BEAUTY SALON</span>
            <span className="block">FOR EVERY WOMEN</span>
          </h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            commodo ipsum duis laoreet maecenas. Feugiat
          </p>
          <button className="btn-primary btn-primary-full btn-short">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
