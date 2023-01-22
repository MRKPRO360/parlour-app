import Examples from "../Examples/Examples";
import HomeBanner from "../HomeBanner/HomeBanner";
import Testimonials from "../Testimonials/Testimonials";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Examples />
      <Testimonials />
    </div>
  );
}
