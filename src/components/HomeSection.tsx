import { Dialog, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { api } from "../utils/api";
import axios from "axios";
import { env } from "../env.mjs";

const cities = [
  "Marrakesh",
  "Fes",
  "Casablanca",
  "Tangier",
  "Essaouira",
  "Agadir",
  "Rabat",
  "Meknes",
  "Ouarzazate",
  "Errachidia",
  "Oujda",
];

const services = [
  "Haircut",
  "Mens haircut",
  "Womens haircut",
  "Kids haircut",
  "Beard trim",
  "Beard shave",
  "Beard dye",
  "Beard trim and shave",
  "Beard trim and dye",
  "Beard shave and dye",
  "Beard trim, shave and dye",
  "Haircut and beard trim",
  "Haircut and beard shave",
  "Haircut and beard dye",
  "Haircut and beard trim and shave",
  "Haircut and beard trim and dye",
  "Haircut and beard shave and dye",
  "Haircut and beard trim, shave and dye",
  "Haircut and beard shave and dye",
];

const error: PositionErrorCallback = (error) => {
  console.log(error);
};

export default function HomeSection() {
  const [openServices, setOpenServices] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [search, setSearch] = useState("");
  const [data1, setData] = useState(false);

  const { data, mutate } = api.service.searchServices.useMutation();

  const [city, setCity] = useState("Unknown");

  const success: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords;

    const info = axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${env.NEXT_PUBLIC_MAP_KEY}`
      )
      .then(({ data: { results } }) => {
        setCity(results[0].city);
      });
  };

  useEffect(() => {
    if (search) {
      const timer = setTimeout(() => {
        mutate({ query: search });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search, mutate]);

  return (
    <>
      <section>
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 " />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-36 lg:px-8">
                <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  <span className="block text-white">Get the best haircut</span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Discover and book beauty & wellness professionals near you
                </p>
                <div className="mx-auto mt-10 max-w-3xl ">
                  <div className="flex max-w-3xl -space-x-px">
                    <div className="relative w-1/2 min-w-0 flex-grow">
                      <label htmlFor="search-service" className="sr-only">
                        Service
                      </label>
                      <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-2">
                        <MagnifyingGlassIcon
                          width={20}
                          height={20}
                          className="text-gray-400"
                        />
                      </div>
                      <input
                        type="text"
                        name="search-service"
                        id="search-service"
                        onClick={() => setOpenServices(true)}
                        className="relative block h-12 w-full cursor-pointer rounded-none rounded-l-md border-gray-300 pl-8 placeholder:text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Book your services..."
                      />
                    </div>
                    <div className="relative w-1/2 min-w-0 flex-grow">
                      <label htmlFor="search-location" className="sr-only">
                        Service
                      </label>
                      <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-2">
                        <MapPinIcon
                          width={20}
                          height={20}
                          className="text-gray-400"
                        />
                      </div>
                      <input
                        type="text"
                        name="search-location"
                        id="search-location"
                        onClick={() => setOpenLocation(true)}
                        className="relative block h-12 w-full cursor-pointer rounded-none rounded-r-md border-gray-300 pl-8 placeholder:text-sm placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
      <Transition.Root show={openServices} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => {
            setOpenServices(false);
            setSearch("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="absolute top-11 transform overflow-hidden rounded-lg bg-white px-0 pt-0 text-left shadow-xl transition-all sm:my-8 sm:min-h-[250px] sm:w-full sm:max-w-3xl sm:pt-0">
                  <div className="w-full">
                    <div className="text-center sm:mt-0 sm:text-left">
                      <div className="relative w-full text-lg font-medium leading-6 text-gray-900">
                        <input
                          type="text"
                          name="search-service"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          id="search-service"
                          className="relative block h-12 w-full rounded-none rounded-t-md border-gray-300 py-7 pl-16 placeholder:text-sm placeholder:text-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="What are you looking for?"
                        />
                        <div className="absolute top-4 left-4 z-30 h-12 ">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpenServices(false)}
                          >
                            <span className="sr-only">Close</span>
                            <ArrowLeftIcon
                              className="h-7 w-7"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {data && data.length > 0 ? (
                    <div className="p-4">
                      <h3 className="mb-2 text-sm font-semibold">SERVICES</h3>
                      <ul>
                        {data
                          ?.map((item, idx) => (
                            <li key={idx}>
                              <div className="flex items-center gap-3 py-2">
                                <MagnifyingGlassIcon
                                  width={20}
                                  height={20}
                                  className="text-gray-300"
                                />
                                <span>{item}</span>
                              </div>
                            </li>
                          ))
                          .slice(0, 8)}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="mb-4 text-sm font-semibold">
                        Popular Services
                      </h3>
                      <ul className="flex flex-wrap gap-3">
                        {services.slice(0, 10).map((item, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              className="inline-flex items-center rounded-2xl border border-gray-300 bg-white px-2.5 py-1.5 text-sm  font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openLocation} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => {
            setOpenLocation(false);
            setSearch("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="absolute top-11 transform overflow-hidden rounded-lg bg-white px-0 pt-0 text-left shadow-xl transition-all sm:my-8 sm:min-h-[300px] sm:w-full sm:max-w-3xl sm:pt-0">
                  <div className="w-full">
                    <div className="text-center sm:mt-0 sm:text-left">
                      <div className="relative w-full text-lg font-medium leading-6 text-gray-900">
                        <input
                          type="text"
                          name="search-service"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          id="search-service"
                          className="relative block h-12 w-full rounded-none rounded-t-md border-gray-300 py-7 pl-16 placeholder:text-sm placeholder:text-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Where?"
                        />
                        <div className="absolute top-4 left-4 z-30 h-12 ">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpenLocation(false)}
                          >
                            <span className="sr-only">Close</span>
                            <ArrowLeftIcon
                              className="h-7 w-7"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-2 pb-1">
                    <div className="flex items-center justify-between">
                      <div className="mb-2 flex flex-1 items-center gap-2">
                        <MapPinIcon className="h-6 w-6" />
                        <div>
                          <span className="text-xs font-light text-gray-400">
                            Your Current Location
                          </span>
                          <div>{city}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.geolocation.getCurrentPosition(
                            success,
                            error,
                            {
                              enableHighAccuracy: true,
                              timeout: 10000,
                            }
                          );
                        }}
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-medium uppercase text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Use my location
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                  </div>
                  {data1 ? (
                    "hh"
                  ) : (
                    <div className="p-4">
                      <h3 className="mb-4 text-xs font-semibold">
                        LOOKING FOR SERVICES ELSEWHERE?{" "}
                      </h3>
                      <ul className="flex flex-wrap gap-3">
                        {cities.slice(0, 10).map((item, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              className="inline-flex items-center rounded-2xl border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
