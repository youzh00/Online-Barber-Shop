import Image from "next/image";
import Link from "next/link";

export default function Section() {
  return (
    <main className="h-[calc(100vh-6rem)]">
      <div className="h-full bg-sectionColor pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14 ">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block text-sectionGray">
                    Discover the best
                  </span>
                  <span className="block text-sectionBlue">
                    Barber shop for you
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  With our platform, you can easily discover the top-rated
                  barbershops in your area. Whether you‘re looking for a classic
                  cut or a trendy new style,our platform has you covered.
                </p>
                <div className="mt-10 sm:mt-12">
                  <div className="mt-10 flex items-center  gap-x-6">
                    <Link
                      href="/home"
                      className="rounded-md bg-sectionBlue px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get started
                    </Link>
                    <Link
                      href="#"
                      className="text-base font-semibold leading-7 text-gray-900"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                <Image
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="/Barber-amico.svg"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
