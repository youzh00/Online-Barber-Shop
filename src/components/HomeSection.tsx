const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function HomeSection() {
  return (
    <section>
      <div>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 " />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-36 lg:px-8">
              <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="block text-white">
                  Search for the best barber for you
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                Discover and book beauty & wellness professionals near you
              </p>
              <div className="mx-auto mt-10 max-w-lg ">
                <div className="flex max-w-3xl -space-x-px">
                  <div className="w-1/2 min-w-0 flex-grow">
                    <label htmlFor="card-expiration-date" className="sr-only">
                      Service
                    </label>
                    <input
                      type="text"
                      name="card-expiration-date"
                      id="card-expiration-date"
                      className="relative block h-12 w-full rounded-none rounded-l-md border-gray-300  focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Service"
                    />
                  </div>
                  <div className="w-1/2 min-w-0 flex-grow">
                    <label htmlFor="card-cvc" className="sr-only">
                      Location
                    </label>
                    <input
                      type="text"
                      name="card-cvc"
                      id="card-cvc"
                      className="relative block h-12 w-full rounded-none rounded-r-md border-gray-300  focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
