import { FadeLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <FadeLoader color="#db2777" />
    </div>
  );
}
