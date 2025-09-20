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
import { useState } from "react";
import {
  getMappingRulesFromLocalStorage,
  clearMappingRulesFromLocalStorage,
} from "../utils/mappingRules";
import { Link } from "@tanstack/react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Papa from "papaparse";
import Notification from "../components/Notification";
import AlertModal from "../components/AlertModal";
import {
  ArrowDownOnSquareIcon,
  DocumentPlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

export const Route = createFileRoute("/mappingrules")({
  component: RouteMappingRulesComponent,
});

function RouteMappingRulesComponent() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);

  function handleDownloadMappingRules() {
    // Export mapping rules to CSV
    const mappingRules = getMappingRulesFromLocalStorage();
    const toBeExported = [];
    Object.entries(mappingRules).forEach(([key, value]) => {
      toBeExported.push({ "payee/payer": key, category: value });
    });
    const csv = Papa.unparse(toBeExported);
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mapping-rules.csv";
    a.click();
    URL.revokeObjectURL(url);

    // Show notification
    setNotificationTitle("Mapping rules downloaded.");
    setNotificationMessage("A CSV file has been downloaded to your device.");
    setShowNotification(true);
    console.log("showNotification: ", showNotification);
  }

  var mappingRules = {};
  try {
    mappingRules = getMappingRulesFromLocalStorage();
  } catch (error) {
    console.error("Error retrieving mapping rules:", error);
  }
  const ruleKeys = [...Object.keys(mappingRules)];

  return (
    <div className="py-10">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Mapping Rules
        </h1>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Description and Buttons */}
        <div className="sm:flex sm:items-center">
          {/* Page Description */}
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              CategorizeOnce creates mapping rules for payers and payees as you
              categorize them.
            </p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              If you have old files that were categorized before, CategorizeOnce
              can also{" "}
              <Link
                to="/importrules"
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                extract rules from them
              </Link>
              .
            </p>
          </div>
          {/* Menu Buttons */}
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Menu as="div" className="relative inline-block">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20">
                Manage
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:divide-white/10 dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to="/importrules"
                      className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                    >
                      <DocumentPlusIcon
                        aria-hidden="true"
                        className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500 dark:text-gray-500 dark:group-data-focus:text-white"
                      />
                      Import rules
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleDownloadMappingRules}
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                    >
                      <ArrowDownOnSquareIcon
                        aria-hidden="true"
                        className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500 dark:text-gray-500 dark:group-data-focus:text-white"
                      />
                      Download rules
                    </button>
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={() => setShowAlertModal(true)}
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                    >
                      <TrashIcon
                        aria-hidden="true"
                        className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500 dark:text-gray-500 dark:group-data-focus:text-white"
                      />
                      Clear all rules
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
        {/* Mapping Rules Table */}
        {ruleKeys.length > 0 && (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="min-w-full px-6 py-2 align-middle sm:inline-block lg:px-8">
                <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                  <thead>
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Payee/Payer
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {ruleKeys.map((key, index) => (
                      <tr key={index}>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {key}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {mappingRules[key]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <Notification
        title={notificationTitle}
        message={notificationMessage}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
      <AlertModal
        title="Clear all mapping rules"
        message="Are you sure you want to delete all mapping rules? This action cannot be undone."
        open={showAlertModal}
        actionText="Delete"
        action={clearMappingRulesFromLocalStorage}
        closeModal={function closeAlertModal() {
          setShowAlertModal(false);
        }}
      />
    </div>
  );
}
