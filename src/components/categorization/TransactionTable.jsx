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

import CategoryCombobox from "./CategoryCombobox";
import Notification from "../Notification";
import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
const defaultCategories = [
  "Rent/Mortgage",
  "Utilities (Electricity/Water/Gas)",
  "Internet",
  "Mobile Phone",
  "Groceries",
  "Dining Out & Takeout",
  "Household Supplies",
  "Personal Care",
  "Car Payment",
  "Fuel",
  "Public Transit/Rideshare",
  "Auto Maintenance & Repairs",
  "Auto Insurance",
  "Health Insurance",
  "Medical & Pharmacy",
  "Dental & Vision",
  "Childcare",
  "School & Activities",
  "Pet Care",
  "Gifts & Holidays",
  "Charitable Giving",
  "Entertainment & Hobbies",
  "Streaming & Subscriptions",
  "Clothing & Shoes",
  "Home Maintenance",
  "Travel",
  "Debt Payments (Credit Cards/Loans)",
  "Miscellaneous/Buffer",
];

export default function TransactionTable({
  csvData,
  csvColumns,
  identifier,
  mappingRules,
  previousStep,
  nextStep,
  setCsvData,
}) {
  // Initialize categories for combobox options.
  const [categories, setCategories] = useState(defaultCategories);
  const [showNotification, setShowNotification] = useState(false);
  useEffect(
    function applyMappingRules() {
      if (identifier && mappingRules) {
        const categorizedData = csvData.map((transaction) => {
          return {
            ...transaction,
            CO_category: mappingRules[transaction[identifier]] || "",
          };
        });
        setCsvData(categorizedData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [identifier, mappingRules],
  );
  useEffect(
    function populateCategoriesFromLocalStorage() {
      if (
        typeof mappingRules == "object" &&
        Object.keys(mappingRules).length > 0
      ) {
        const uniqueCategories = new Set(Object.values(mappingRules));
        setCategories([...uniqueCategories]);
      }
    },
    [mappingRules],
  );

  function handleCategoryChange(expense_id, newCategory) {
    setCsvData((curCsvData) => {
      // Use .map instead of .forEach because .map returns a new array so that React can detect changes
      return curCsvData.map((transaction) => {
        return {
          ...transaction,
          CO_category:
            transaction["CO_id"] === expense_id
              ? newCategory
              : transaction.CO_category,
        };
      });
    });
  }

  function handleSubmitCategorization() {
    // check if all transactions are categorized
    const allCategorized = csvData.every(
      (transaction) => transaction["CO_category"],
    );
    if (!allCategorized) {
      setShowNotification(true);
      return;
    }
    nextStep();
  }

  if (!csvColumns || !csvData) {
    return <div>No data available</div>;
  }

  return (
    <>
      {/* Pro tip */}
      <Disclosure as="div" className="mb-6">
        <dt>
          <DisclosureButton className="group flex w-full items-start justify-start text-left text-indigo-600 dark:text-white">
            <span className="mr-2 flex h-7 items-center">
              <PlusIcon
                aria-hidden="true"
                className="size-6 group-data-open:hidden"
              />
              <MinusIcon
                aria-hidden="true"
                className="size-6 group-not-data-open:hidden"
              />
            </span>
            <span className="text-base/7 font-semibold">
              How to create sub-categories and track more than your expenses
            </span>
          </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" className="mt-2 mb-4 pr-12">
          <p className="text-base/7 text-gray-600 dark:text-gray-400">
            You can use double colons to create sub-categories, e.g.{" "}
            <code className="rounded bg-indigo-100 px-2 py-1 text-indigo-600 dark:text-indigo-400">
              Income::Salary
            </code>
            ,{" "}
            <code className="rounded bg-indigo-100 px-2 py-1 text-indigo-600 dark:text-indigo-400">
              Expense::Grocery
            </code>
            ,{" "}
            <code className="rounded bg-indigo-100 px-2 py-1 text-indigo-600 dark:text-indigo-400">
              Saving::Travel Fund
            </code>
            . When you export the result, they will be broken into separate
            columns.
          </p>
        </DisclosurePanel>
      </Disclosure>
      {/* Transaction Table */}
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="sm: inline-block min-w-full px-6 align-middle lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead>
                <tr>
                  {csvColumns.map((col_name) => (
                    <th
                      scope="col"
                      key={col_name}
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      {col_name}
                    </th>
                  ))}
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {csvData.map((row) => (
                  <tr key={row["CO_id"]}>
                    {csvColumns.map((col_name) => (
                      <td
                        key={col_name}
                        className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                      >
                        {row[col_name]}
                      </td>
                    ))}
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <CategoryCombobox
                        categories={categories}
                        prefilledCategory={row["CO_category"]}
                        setCategories={setCategories}
                        onCategoryChange={(category) =>
                          handleCategoryChange(row["CO_id"], category)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Button Group */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white"
          onClick={previousStep}
        >
          Back
        </button>
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
          onClick={handleSubmitCategorization}
        >
          Done
        </button>
      </div>
      <Notification
        vibe="error"
        title="You have uncategorized transaction(s)"
        message="Please categorize all transactions before proceeding."
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </>
  );
}
