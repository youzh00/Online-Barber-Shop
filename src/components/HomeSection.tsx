import { Dialog, Transition } from "@headlessui/react";
import {
  // XMarkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { api } from "../utils/api";

export default function HomeSection() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, mutate } = api.service.searchServices.useMutation();

  useEffect(() => {
    if (search.length > 0) {
      const timer = setTimeout(() => {
        mutate({ query: search });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search, mutate]);

  function handleOpen() {
    setOpen(true);
  }

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
                <div className="mx-auto mt-10 max-w-xl ">
                  <div className="flex max-w-2xl -space-x-px">
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
                        onClick={handleOpen}
                        className="relative block h-12 w-full cursor-pointer rounded-none rounded-l-md border-gray-300 pl-8 placeholder:text-base placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Service"
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
                        onClick={handleOpen}
                        className="relative block h-12 w-full cursor-pointer rounded-none rounded-r-md border-gray-300 pl-8 placeholder:text-base placeholder:text-gray-400 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-0 pt-0 text-left shadow-xl transition-all sm:my-8 sm:min-h-[300px] sm:w-full sm:max-w-2xl sm:pt-0">
                  {/* <div className="absolute top-0 left-0 hidden pt-8 pl-2 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div> */}
                  <div className="w-full">
                    <div className="text-center sm:mt-0 sm:text-left">
                      <div className="w-full text-lg font-medium leading-6 text-gray-900">
                        <input
                          type="text"
                          name="search-service"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          id="search-service"
                          className="relative block h-12 w-full rounded-none rounded-t-md border-gray-300  focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="What are you looking for?"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul>
                      {data?.map((item, idx) => (
                        <li key={idx}>
                          <div className="flex items-center space-x-4">
                            <MagnifyingGlassIcon
                              width={20}
                              height={20}
                              className="text-gray-400"
                            />
                            <span>{item}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
