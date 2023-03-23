import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CogIcon,
  KeyIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../utils/api";
import Link from "next/link";
import Footer from "../../components/Footer";

const subNavigation = [
  {
    name: "Profile",
    href: "settings/profile",
    icon: UserCircleIcon,
    current: true,
  },
  { name: "Account", href: "settings/account", icon: CogIcon, current: false },
  {
    name: "Password",
    href: "settings/password",
    icon: KeyIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsPage() {
  const { data } = useSession();

  const userNavigation =
    data?.user.role == "BARBER"
      ? [
          { name: "Settings", href: "/settings" },
          { name: "My Shops", href: "/shops" },
          {
            name: "Create new shop",
            href: "/shops/newshop",
          },
        ]
      : [{ name: "Settings", href: "/settings" }];
  const becomeBarber = api.user.updateToBarber.useMutation();
  const updateProfile = api.user.updateUser.useMutation();

  const isBarber = data?.user.role === "BARBER";

  const [availableToSwitch, setAvailableToSwitch] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(data?.user.name || "");
  }, [data?.user.name]);
  useEffect(() => {
    setAvailableToSwitch(data?.user.role === "BARBER");
  }, [data?.user.role]);

  function handleSave() {
    if (username !== data?.user.name) {
      updateProfile.mutate({
        name: username,
      });
    }
    if (availableToSwitch && data?.user.role !== "BARBER") {
      becomeBarber.mutate({
        id: data?.user.id || "",
      });
    }
  }

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
                            <Link href={"/home"}>BarberShop</Link>
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
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block py-2 px-4 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                              <Menu.Item key={"signout"}>
                                {({ active }) => (
                                  <Link
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      void signOut();
                                    }}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Sign out
                                  </Link>
                                )}
                              </Menu.Item>
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
                <form
                  className="divide-y divide-gray-200 lg:col-span-9"
                  action="#"
                  method="POST"
                  onSubmit={handleSave}
                >
                  {/* Profile section */}
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Profile
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <div className="mt-1 border-b border-gray-300 focus-within:border-blue-700">
                            <input
                              onChange={(e) => setUsername(e.target.value)}
                              type="text"
                              name="name"
                              id="name"
                              value={username}
                              className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                        <p
                          className="text-sm font-medium text-gray-700"
                          aria-hidden="true"
                        >
                          Photo
                        </p>
                        <div className="mt-1 lg:hidden">
                          <div className="flex items-center">
                            <div
                              className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                              aria-hidden="true"
                            >
                              <div className="relative  h-full w-full rounded-full">
                                <Image
                                  fill={true}
                                  src={data?.user.image || ""}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="ml-5 rounded-md shadow-sm">
                              <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                                <label
                                  htmlFor="mobile-user-photo"
                                  className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                                >
                                  <span>Change</span>
                                  <span className="sr-only"> user photo</span>
                                </label>
                                <input
                                  id="mobile-user-photo"
                                  name="user-photo"
                                  type="file"
                                  className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative hidden overflow-hidden rounded-full lg:block">
                          <div className="relative h-40 w-40 rounded-full">
                            <Image
                              fill={true}
                              src={data?.user.image || ""}
                              alt=""
                            />
                          </div>
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                          >
                            <span>Change</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              type="file"
                              id="desktop-user-photo"
                              name="user-photo"
                              className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6"></div>
                  </div>

                  {/* Privacy section */}
                  <div className="divide-y divide-gray-200 pt-6">
                    <div className="px-4 sm:px-6">
                      <div>
                        <h2 className="text-lg font-medium leading-6 text-gray-900">
                          Role
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Consider transitioning from your current role as a
                          client to becoming a successful owner of a barber shop
                        </p>
                      </div>
                      <ul role="list" className="mt-2 divide-y divide-gray-200">
                        <Switch.Group
                          as="li"
                          className="flex items-center justify-between py-4"
                        >
                          <div className="flex flex-col">
                            <Switch.Label
                              as="p"
                              className="text-sm font-medium text-gray-900"
                              passive
                            >
                              Switch to barber
                            </Switch.Label>
                            <Switch.Description className="text-sm text-gray-500">
                              If you are a barber, make the switch to your
                              barber account to streamline your workflow and
                              provide better service to your clients.
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={availableToSwitch}
                            onChange={setAvailableToSwitch}
                            disabled={isBarber}
                            className={classNames(
                              availableToSwitch ? "bg-teal-500" : "bg-gray-200",
                              "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-teal-300 disabled:hover:cursor-not-allowed"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                availableToSwitch
                                  ? "translate-x-5"
                                  : "translate-x-0",
                                "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </ul>
                    </div>
                    <div className="mt-4 py-4 px-4 sm:px-6">
                      <button
                        type="submit"
                        className="ml-auto block rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
