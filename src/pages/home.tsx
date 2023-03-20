import Image from "next/image";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
import Shop from "../components/Shop";
// Sort Order = (Rating x 100) + Reviews

const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const shop = {
  title: "Boost your conversion rate",
  href: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/428252/biz_photo/baf7d40984154e29b85a7201d5d8a9-razor-touchd-biz-photo-baa5c2951bc34fec8728a8bc19482a-booksy.jpeg?size=640x427",
  address: "Lorem, ipsum, dolor, sit amet dolor 2023, sit amet",
  rating: 4.8,
  reviews: 34,
  imageUrl:
    "https://d2zdpiztbgorvt.cloudfront.net/region1/us/428252/biz_photo/baf7d40984154e29b85a7201d5d8a9-razor-touchd-biz-photo-baa5c2951bc34fec8728a8bc19482a-booksy.jpeg?size=640x427",
};

const home = () => {
  console.log(SLIDES);
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            style={{
              backgroundImage:
                "url(https://dk2h3gy4kn9jw.cloudfront.net/web-2019/d64d531d/img/header-bg.e7c5c48.jpg)",
            }}
          >
            <video playsInline autoPlay muted loop className="object-cover">
              <source
                src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
                type="video/webm"
              />
              <source
                src="https://booksy-public.s3.amazonaws.com/US.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="absolute inset-0 bg-slate-500 mix-blend-multiply" />
        </div>
        <Header transparent />
        <HomeSection />
      </div>
      <main>
        <div className="mx-auto max-w-7xl bg-white py-6 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold" id="recommended">
            Recommended
          </h2>
          <Carousel align="start">
            {SLIDES.map((src, i) => {
              return (
                <div className="relative flex-[0_0_25%]" key={i}>
                  <Shop {...shop} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default home;
