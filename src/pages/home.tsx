import { type EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
// Sort Order = (Rating x 100) + Reviews

const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const home = () => {
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
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Carousel loop>
            {SLIDES.map((src, i) => {
              return (
                <div className="relative h-64 flex-[0_0_25%]" key={i}>
                  <Image
                    src={"/image-2.jpg"}
                    fill
                    className="object-cover object-center"
                    alt="alt"
                  />
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
