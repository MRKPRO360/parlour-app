import Examples from "../Examples/Examples";
import HomeBanner from "../HomeBanner/HomeBanner";
import PhotoGallery from "../PhotoGallery/PhotoGallery";
import Testimonials from "../Testimonials/Testimonials";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <PhotoGallery />
      <Examples />
      <Testimonials />
    </div>
  );
}
