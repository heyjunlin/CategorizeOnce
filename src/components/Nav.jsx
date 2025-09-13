/*
 * Copyright 2025 Junlin Shang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "@tanstack/react-router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Introduction", pageID: "intro", path: "/", current: false },
  {
    name: "Categorize Transactions",
    pageID: "categorize",
    path: "/categorize",
    current: false,
  },
  {
    name: "Mapping Rules",
    pageID: "mapping",
    path: "/mappingrules",
    current: false,
  },
];
export default function Nav() {
  const currentPath = useLocation({ select: (location) => location.pathname });

  return (
    <>
      <Disclosure
        as="nav"
        className="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <h1
                  aria-label="Logo"
                  className="font-semi-bold rounded bg-indigo-600 px-1 text-white"
                >
                  C 🄾
                </h1>
              </Link>
            </div>

            {/* Navigation Links for non mobile */}
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={item.path === currentPath ? "page" : undefined}
                  className={classNames(
                    item.path === currentPath
                      ? "border-indigo-600 text-gray-900 dark:border-indigo-500 dark:text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              {/* GitHub Star Button */}
              <div className="hidden items-center sm:flex">
                <a
                  className="github-button"
                  href="https://github.com/heyjunlin/CategorizeOnce"
                  aria-label="View on GitHub"
                >
                  <img
                    src="https://img.shields.io/github/stars/heyjunlin/CategorizeOnce?style=social"
                    alt="GitHub"
                  />
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white dark:focus:outline-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.path}
                aria-current={item.path === currentPath ? "page" : undefined}
                className={classNames(
                  item.path === currentPath
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-600/10 dark:text-indigo-300"
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-200",
                  "block border-l-4 py-2 pr-4 pl-3 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}
