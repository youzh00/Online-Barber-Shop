import { Dialog, Transition } from "@headlessui/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import { env } from "../../env.mjs";
import { api } from "../../utils/api";

// const reviews = { href: "#", average: 4, totalCount: 117 };

const shop = {};
export default function Example() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: shop } = api.shop.getShopById.useQuery({ id });
  const incrementQueue = api.shop.incrementQueue.useMutation();

  const breadcrumbs = [
    { id: 1, name: "Barbers", href: "/home" },
    {
      id: 2,
      name: shop?.type == "BOTH" ? "All Gender" : shop?.type,
      href: "#",
    },
  ];
  // modal section
  const [open, setOpen] = useState(false);
  const center = { lat: shop?.lat || 31, lng: shop?.lng || -6 };
  const containerStyle = {
    width: "450px",
    height: "450px",
  };

  function HandleSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    incrementQueue.mutate({ id: shop?.id as string });
  }
  return (
    shop && (
      <div>
        <Header />
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
                <li className="text-sm">
                  <h2 className="font-medium text-gray-500 hover:text-gray-600">
                    {shop?.name}
                  </h2>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6  max-w-3xl">
              <Carousel>
                {shop?.pictures.map((picture) => {
                  return (
                    <div
                      key={picture}
                      className="relative h-96 flex-[0_0_100%]"
                    >
                      <Image
                        src={picture}
                        className="w-full object-cover"
                        fill
                        alt=""
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>

            {/* shop info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              {/* Shop name */}
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {shop?.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <div className="mt-3">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      In Queue : {shop?.queue}
                    </h2>
                  </div>
                </div>
                {/* Reviews */}
                {/* <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div> */}

                <div className="mt-6">
                  <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden ">
                          <table className="min-w-full divide-y divide-gray-300">
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                City & Street
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {shop?.city}, {shop?.street}
                              </td>
                            </tbody>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                Opening
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {shop?.opening}
                              </td>
                            </tbody>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                Closing
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {shop?.closing}
                              </td>
                            </tbody>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                Phone Number
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {shop?.phone}
                              </td>
                            </tbody>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                Email
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {shop?.email}
                              </td>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="mt-2" onSubmit={HandleSubmit}>
                  {/* Location */}
                  <div className="">
                    <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-5 sm:border-t sm:border-gray-200 sm:pt-5">
                      <h2 className="text-lg font-medium text-gray-900">
                        Shop location
                      </h2>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(true)}
                      >
                        Open
                      </button>
                      <Transition.Root show={open} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          onClose={setOpen}
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
                                <Dialog.Panel className="relative max-h-[600px] max-w-xl transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6">
                                  <div className="mt-5 sm:mt-6 ">
                                    <div className="m-8">
                                      <LoadScript
                                        googleMapsApiKey={
                                          env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                                        }
                                      >
                                        <GoogleMap
                                          mapContainerStyle={containerStyle}
                                          center={center}
                                          zoom={10}
                                        >
                                          <Marker position={center} />
                                        </GoogleMap>
                                      </LoadScript>
                                    </div>
                                    <button
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                      onClick={() => setOpen(false)}
                                    >
                                      Go back
                                    </button>
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition.Root>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Join Queue
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Description :
                  </h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {shop?.description}
                    </p>
                  </div>
                </div>

                {/* end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
