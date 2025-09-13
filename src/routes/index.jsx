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

import { createFileRoute } from "@tanstack/react-router";
import {
  ComputerDesktopIcon,
  LockClosedIcon,
  FingerPrintIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import category_layer from "../assets/category_layer.png";
import md_ss_rules from "../assets/md_ss_rules.png";
import screenshot_import_rules from "../assets/import-rules.png";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/")({
  component: HomePage,
});
const data_ownership_features = [
  {
    name: "Data processed locally",
    description:
      "Your statement file is processed entirely within your computer. Nothing is uploaded.",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Mapping rules stored locally",
    description:
      "CategorizeOnce creates mapping rules on how to categorize transactions and store them in your browser's local storage.",
    icon: LockClosedIcon,
  },
  {
    name: "You own your data",
    description: "You can export or delete the mapping rules anytime you want.",
    icon: FingerPrintIcon,
  },
];

const faqs = [
  {
    question: "Where does CategorizeOnce store my data?",
    answer: `First, CategorizeOnce doesn't store your bank statements. It only stores mapping rules, such as "Walmart => Grocery," in your browser's local storage. Please note that anyone using the same browser on your device can view these rules.`,
  },
  {
    question: "How do I know my data indeed stays in my device?",
    answer:
      "The easiest way is to disconnect the Internet and see how this app still works. Additionally, you're always welcome to examine the code. It's open-sourced under the Apache License, Version 2.0.",
  },
  {
    question: `I'm not a programmer, what does "open-source" mean for me?`,
    answer:
      "1. The code is open to audit, making it more trustworthy to you. \n 2. This app is free forever. Since the code is publicly available, I can't regret my decision and put it behind a paywall. \n 3. You own your data, and even if this website disappeared tomorrow, you (or others) could still run the app.",
  },
];

const navigation = {
  main: [
    { name: "Categorize Transactions", href: "/categorize" },
    { name: "Mapping Rules", href: "/mappingrules" },
    { name: "GitHub", href: "https://github.com/heyjunlin/CategorizeOnce" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Text */}
      <div className="isolate bg-transparent px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
              Auto-categorize transactions without AI
            </h1>
            <p className="mt-8 text-lg font-normal text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              An open-source solution that requires no data upload, no
              registration, no bank account linking, <b>for free</b>.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#how-it-works"
                className="text-sm/6 font-semibold text-gray-900 dark:text-white"
              >
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* features: how it works */}
      <div
        id="how-it-works"
        className="overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-h-[50lvh] max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                  How it works
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                  You only categorize once
                </p>
                <ol className="mt-6 list-decimal pl-6 text-lg/8 text-gray-600 dark:text-gray-300">
                  <li>Import a bank statement.</li>
                  <li>Categorize your transactions.</li>
                  <li>Export the result as a CSV file.</li>
                  <li>
                    CategorizeOnce creates mapping rules for each payee/payer as
                    you categorize them.
                  </li>
                  <li>Next time, it will automatically categorize them.</li>
                </ol>
              </div>
            </div>
            <img
              alt="Product screenshot"
              src={md_ss_rules}
              className="hidden rounded-xl shadow-xl ring-1 ring-gray-400/10 lg:inline dark:ring-white/10"
            />
          </div>
        </div>
      </div>
      {/* features: data ownership */}
      <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Privacy first
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Your data never leaves your computer
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {data_ownership_features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                    <feature.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-indigo-600 dark:text-indigo-400"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* add layers */}
      <div className="overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pt-4 lg:pl-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                  Subcategories
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                  One system for income, expenses, and savings
                </p>
                <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                  Use double colons to create hierarchical subcategories, e.g.{" "}
                  <code className="rounded bg-indigo-100 px-2 py-1 text-indigo-600 dark:text-indigo-400">
                    Income::Salary
                  </code>
                  ,{" "}
                  <code className="rounded bg-indigo-100 px-2 py-1 text-indigo-600 dark:text-indigo-400">
                    Expense::Grocery
                  </code>
                  ,{" "}
                  <code className="rounded bg-indigo-100 px-2 py-1 text-indigo-600 dark:text-indigo-400">
                    Saving::Investment
                  </code>
                  . When you export, each level becomes its own column.
                </p>
              </div>
            </div>
            <div className="lg:order-first">
              <img
                alt="Add structure to your category system"
                src={category_layer}
              />
            </div>
          </div>
        </div>
      </div>
      {/* features: import rules */}
      <div className="overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-h-[50lvh] max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                  Easy migration
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                  Jump-start with existing data
                </p>
                <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                  Import previously categorized bank statements, and let
                  CategorizeOnce create mapping rules based on them.
                </p>
              </div>
            </div>
            <img
              alt="Screenshot of importing rules"
              src={screenshot_import_rules}
              className="rounded-xl shadow-xl ring-1 ring-gray-400/10 dark:ring-white/10"
            />
          </div>
        </div>
      </div>
      {/* Q&A */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Questions and Answers
            </h2>
            <dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
              {faqs.map((faq, index) => (
                <Disclosure
                  key={index}
                  as="div"
                  className="py-6 first:pt-0 last:pb-0"
                >
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                      <span className="text-base/7 font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-6 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-6 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base/7 whitespace-pre-line text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <nav
            aria-label="Footer"
            className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
          >
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-center text-sm/6 text-gray-600 dark:text-gray-400">
            &copy; 2025 CategorizeOnce by{" "}
            <a
              className="underline"
              href="https://github.com/heyjunlin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Junlin Shang
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
