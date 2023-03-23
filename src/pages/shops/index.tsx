import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BuildingStorefrontIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../utils/api";
import Footer from "../../components/Footer";

const subNavigation = [
  {
    name: "Shops",
    href: "settings/profile",
    icon: BuildingStorefrontIcon,
    current: true,
  },
  {
    name: "Create New Shop",
    href: "shops/newshop",
    icon: PlusIcon,
    current: false,
  },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPage() {
  const { data } = useSession();
  const { data: shops } = api.shop.getUserShops.useQuery();

  return (
    <>
      <div>
        <Disclosure
          as="div"
          className="relative overflow-hidden bg-sky-700 pb-32"
        >
          {({ open }) => (
            <>
              <nav
                className={classNames(
                  open ? "bg-sky-900" : "bg-transparent",
                  "relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent"
                )}
              >
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0">
                        <div className="block h-8 w-auto">
                          <span className="text-2xl font-bold text-white">
                            BarberShop
                          </span>
                        </div>
                      </div>
                      <div className="hidden lg:ml-6 lg:block lg:space-x-4"></div>
                    </div>

                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6 flex-shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6 flex-shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                          <div>
                            <Menu.Button className="flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
                              <span className="sr-only">Open user menu</span>
                              <div className="relative h-8 w-8 rounded-full">
                                <Image
                                  className="rounded-full"
                                  src={data?.user.image || ""}
                                  width={32}
                                  height={32}
                                  alt=""
                                />
                              </div>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block py-2 px-4 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="bg-sky-900 lg:hidden">
                  <div className="border-t border-sky-800 pt-4 pb-3">
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <div className="relative h-10 w-10 rounded-full">
                          <Image
                            fill={true}
                            src={data?.user.image || ""}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          {data?.user.name}
                        </div>
                        <div className="text-sm font-medium text-sky-200">
                          {data?.user.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </nav>
              <div
                aria-hidden="true"
                className={classNames(
                  open ? "bottom-0" : "inset-y-0",
                  "absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
                )}
              >
                <div className="absolute inset-0 flex">
                  <div
                    className="h-full w-1/2"
                    style={{ backgroundColor: "#0a527b" }}
                  />
                  <div
                    className="h-full w-1/2"
                    style={{ backgroundColor: "#065d8c" }}
                  />
                </div>
                <div className="relative flex justify-center">
                  <svg
                    className="flex-shrink-0"
                    width={1750}
                    height={308}
                    viewBox="0 0 1750 308"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                      fill="#0369a1"
                    />
                    <path
                      d="M1465.84 308L16.816 0H1750v308h-284.16z"
                      fill="#065d8c"
                    />
                    <path
                      d="M1733.19 0L284.161 308H0V0h1733.19z"
                      fill="#0a527b"
                    />
                    <path
                      d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                      fill="#0a4f76"
                    />
                  </svg>
                </div>
              </div>
              <header className="relative py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    Settings
                  </h1>
                </div>
              </header>
            </>
          )}
        </Disclosure>

        <main className="relative -mt-32">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {subNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-teal-500 group-hover:text-teal-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </aside>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
