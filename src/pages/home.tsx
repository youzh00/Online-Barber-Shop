import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
// Sort Order = (Rating x 100) + Reviews
const home = () => {
  return (
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
      <main>
        <HomeSection />
      </main>
    </div>
  );
};

export default home;
