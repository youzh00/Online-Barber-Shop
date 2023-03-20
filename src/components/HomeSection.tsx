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
import useStore from "../store/useStore";

const cities = [
  { city: "Casablanca", lat: 33.5992, lng: -7.62 },
  { city: "Fès", lat: 34.0433, lng: -5.0033 },
  { city: "Tangier", lat: 35.7767, lng: -5.8039 },
  { city: "Marrakech", lat: 31.6295, lng: -7.9811 },
  { city: "Sale", lat: 34.05, lng: -6.8167 },
  { city: "Rabat", lat: 34.0253, lng: -6.8361 },
  { city: "Meknès", lat: 33.8833, lng: -5.55 },
  { city: "Kenitra", lat: 34.25, lng: -6.5833 },
  { city: "Agadir", lat: 30.4167, lng: -9.5833 },
  { city: "Oujda", lat: 34.69, lng: -1.91 },
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
];

export default function HomeSection() {
  const [openServices, setOpenServices] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchServices, setSearchServices] = useState("");

  const { data: shops, mutate: mutateShops } = api.shop.findShop.useMutation();

  const service = useStore((state) => state.service);
  const setService = useStore((state) => state.setService);

  const { data: servicesData, mutate: mutateServices } =
    api.service.searchServices.useMutation();
  const { data: citiesData, mutate: mutateCities } =
    api.service.searchCities.useMutation();

  const [address, setAddress] = useState("Unknown");

  const error: PositionErrorCallback = () => {
    setAddress("Please Allow Location Access");
  };
  const success: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords;

    const info = axios
      .get<{
        results: {
          city: string;
          address_line1: string;
          lat: number;
          lon: number;
        }[];
      }>(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${env.NEXT_PUBLIC_MAP_KEY}`
      )
      .then(({ data: { results } }) => {
        const { city, address_line1, lat, lon } = results[0] as {
          city: string;
          address_line1: string;
          lat: number;
          lon: number;
        };
        setAddress(city + ", " + address_line1);
        setOpenLocation(false);
        mutateShops({
          location: {
            city,
            lat,
            lng: lon,
          },
        });
        const element = document.getElementById("recommended");
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
  };

  useEffect(() => {
    if (searchLocation) {
      const timer = setTimeout(() => {
        mutateCities({ query: searchLocation });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchLocation, mutateCities]);

  useEffect(() => {
    if (searchServices) {
      const timer = setTimeout(() => {
        mutateServices({ query: searchServices });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchServices, mutateServices]);

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
                        value={service}
                        readOnly
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
                        readOnly
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
            setSearchServices("");
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
                          value={searchServices}
                          onChange={(e) => setSearchServices(e.target.value)}
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
                  {servicesData && servicesData.length > 0 ? (
                    <div className="p-4">
                      <h3 className="mb-2 text-sm font-semibold">SERVICES</h3>
                      <ul>
                        {servicesData
                          ?.map((item, idx) => (
                            <li
                              key={idx}
                              className="group hover:cursor-pointer"
                              onClick={() => {
                                setOpenServices(false);
                                setService(item);
                                mutateShops({
                                  name: item,
                                });
                                const element =
                                  document.getElementById("recommended");
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
                            >
                              <div className="flex items-center gap-3 py-2 group-hover:text-blue-600">
                                <MagnifyingGlassIcon
                                  width={20}
                                  height={20}
                                  className="text-gray-300 group-hover:text-blue-600"
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
                              onClick={() => {
                                setOpenServices(false);
                                setService(item);
                                mutateShops({
                                  name: item,
                                });
                                const element =
                                  document.getElementById("recommended");
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
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
            setSearchLocation("");
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
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
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
                          <div>{address}</div>
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
                  {citiesData && citiesData.length > 0 ? (
                    <div className="p-4">
                      <h3 className="mb-2 text-sm font-semibold">Locations</h3>
                      <ul>
                        {citiesData
                          ?.map((item, idx) => (
                            <li
                              key={idx}
                              className="group hover:cursor-pointer"
                              onClick={() => {
                                setOpenLocation(false);
                                mutateShops({
                                  location: item,
                                });
                                const element =
                                  document.getElementById("recommended");
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
                            >
                              <div className="flex items-center gap-3 py-2 group-hover:text-blue-600">
                                <MapPinIcon
                                  width={20}
                                  height={20}
                                  className="text-gray-300 group-hover:text-blue-600"
                                />
                                <span>{item.city}</span>
                              </div>
                            </li>
                          ))
                          .slice(0, 8)}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="font-base mb-4 text-sm">
                        LOOKING FOR SERVICES ELSEWHERE?
                      </h3>
                      <ul className="flex flex-wrap gap-3">
                        {cities.slice(0, 10).map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                setOpenLocation(false);
                                mutateShops({
                                  location: item,
                                });
                                const element =
                                  document.getElementById("recommended");
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
                              type="button"
                              className="inline-flex items-center rounded-2xl border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              {item.city}
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
