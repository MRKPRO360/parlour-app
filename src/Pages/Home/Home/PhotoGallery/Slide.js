function Slide({ gallery }) {
  return (
    <div className="rounded-md overflow-hidden w-full h-full">
      <img
        className="object-cover w-full h-full"
        src={gallery}
        alt="parlour care"
      />
    </div>
  );
}

export default Slide;
