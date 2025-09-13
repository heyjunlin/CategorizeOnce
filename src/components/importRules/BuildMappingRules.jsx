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

import { useState, useEffect } from "react";
import { addMappingRulesToLocalStorage } from "../../utils/mappingRules";
import { ChevronDownIcon, ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

export default function BuildMappingRules({
  csvColumns,
  csvData,
  fileName,
  resetParentState,
  notifyImportSuccess,
}) {
  const [counterpartyColumn, setCounterpartyColumn] = useState("");
  const [categoryColumn, setCategoryColumn] = useState("");

  useEffect(
    function suggestColumns() {
      if (!csvColumns || csvColumns.length === 0) return;
      // Find default counterparty column based on typical names
      const defaultCounterparty = csvColumns.find(
        (col) =>
          col.toLowerCase().includes("desc") ||
          col.toLowerCase().includes("merch") ||
          col.toLowerCase().includes("narr") ||
          col.toLowerCase().includes("paye") ||
          col.toLowerCase().includes("beneficiary") ||
          col.toLowerCase().includes("party") ||
          col.toLowerCase().includes("memo"),
      );

      // Find default category column
      const defaultCategory = csvColumns.find((col) =>
        col.toLowerCase().includes("category"),
      );

      if (defaultCounterparty) setCounterpartyColumn(defaultCounterparty);
      if (defaultCategory) setCategoryColumn(defaultCategory);
    },
    [csvColumns],
  );

  const sampleData = Array.isArray(csvData) ? csvData.slice(0, 5) : [];
  function handleImportRules() {
    var newRules = {};
    if (Array.isArray(csvData)) {
      csvData.forEach((row) => {
        newRules[row[counterpartyColumn]] = row[categoryColumn];
      });
    }
    addMappingRulesToLocalStorage(newRules);
    setCounterpartyColumn(null);
    setCategoryColumn(null);
    notifyImportSuccess();
    resetParentState();
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-x-4">
        <button
          onClick={resetParentState}
          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
        >
          <ArrowUturnLeftIcon className="mr-1 inline-block h-4 w-4" />
          Back
        </button>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          You are importing rules from {fileName}
        </p>
      </div>
      {/* Select Counter Party Column */}
      <div>
        <label
          htmlFor="counterparty_column"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white"
        >
          Which column describes where the money flows to/from?
        </label>
        <div className="mt-2 grid max-w-fit grid-cols-1">
          <select
            id="counterparty_column"
            required={true}
            name="counterparty_column"
            value={counterpartyColumn}
            onChange={(e) => setCounterpartyColumn(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500"
          >
            <option
              hidden
              disabled
              value=""
              className="ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              {" "}
              -- Select a column --{" "}
            </option>
            {csvColumns.map((col) => (
              <option
                key={col}
                className="ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white"
                value={col}
              >
                {col}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="category_column"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white"
        >
          Which column represents the category?
        </label>
        <div className="mt-2 grid max-w-fit grid-cols-1">
          <select
            id="category_column"
            required={true}
            name="category_column"
            value={categoryColumn}
            onChange={(e) => setCategoryColumn(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500"
          >
            <option
              hidden
              disabled
              value=""
              className="ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              {" "}
              -- Select a column --{" "}
            </option>
            {csvColumns.map((col) => (
              <option
                key={col}
                className="ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white"
                value={col}
              >
                {col}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
          />
        </div>
      </div>

      {counterpartyColumn && categoryColumn && sampleData.length > 0 ? (
        <div className="flow-root">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Preview of new mapping rules (first five)
          </h2>
          <div className="-mx-4 -my-2 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="sm: inline-block min-w-full px-6 align-middle lg:px-8">
              <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      From/To
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {sampleData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {row[counterpartyColumn]}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {row[categoryColumn]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={handleImportRules}
            className="mt-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
          >
            Import Rules
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
