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

import { useEffect } from "react";
import Papa from "papaparse";
import { addMappingRulesToLocalStorage } from "../../utils/mappingRules";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowsPointingInIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Summarize by category",
    description:
      "Use a pivot table to add up the totals for each category, and maybe make a pie chart too!",
    icon: ChartPieIcon,
  },
  {
    name: "Spot patterns & trends",
    description:
      "Keep your historical files together, look at trends, identify irregular costs.",
    icon: ArrowTrendingUpIcon,
  },
  {
    name: "Consolidate your statements",
    description:
      "Combine all the statements from the same billing cycle to see the big picture. Remember, you can categorize incomes and savings too!",
    icon: ArrowsPointingInIcon,
  },
];

export default function FinishCategorization({
  identifier,
  csvData,
  fileName,
  setMappingRules,
  nextStep,
}) {
  useEffect(
    function updateMappingRules() {
      const newMappingRules = {};
      csvData.forEach((row) => {
        if (row[identifier] && row["CO_category"]) {
          newMappingRules[row[identifier]] = row["CO_category"];
        }
      });
      addMappingRulesToLocalStorage(newMappingRules);
      setMappingRules((prevMappingRules) => ({
        ...prevMappingRules,
        ...newMappingRules,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [csvData, identifier],
  );
  useEffect(
    function downloadCsv() {
      const csvDataCopy = csvData.map((row) => ({ ...row }));
      csvDataCopy.forEach((row) => {
        delete row["CO_id"];
        const splitted_categories = row["CO_category"].split("::");
        row["CO_category"] = splitted_categories[0];
        for (let i = 1; i < splitted_categories.length; i++) {
          row[`CO_category_${i + 1}`] = splitted_categories[i];
        }
      });
      var exportColumns = [];
      // Iterate through csvDataCopy, find the row with the most keys, assign they keys to `exportColumns`.
      csvDataCopy.forEach((row) => {
        const rowKeys = Object.keys(row);
        if (rowKeys.length > exportColumns.length) {
          exportColumns = rowKeys;
        }
      });

      const processedCsv = Papa.unparse(csvDataCopy, {
        columns: exportColumns,
      });
      const blob = new Blob([processedCsv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `processed - ${fileName || "statement.csv"}`;
      link.click();
      URL.revokeObjectURL(url);
    },
    [csvData, fileName],
  );

  return (
    <>
      <div className="rounded-md bg-green-50 p-4 dark:bg-green-500/10 dark:outline dark:outline-green-500/20">
        <div className="flex">
          <div className="shrink-0">
            <CheckCircleIcon
              aria-hidden="true"
              className="size-5 text-green-400"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              You've finished categorizing a statement!
            </h3>
            <div className="mt-2 text-sm text-green-700 dark:text-green-200/85">
              <p>The processed CSV file has been downloaded to your device.</p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-transparent dark:text-green-200 dark:hover:bg-white/10 dark:focus-visible:outline-offset-1 dark:focus-visible:outline-green-500/50"
                >
                  Start another file
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-6 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
              What's next?
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
              Use your favorite spreadsheet software to work on the processed
              CSV.
            </p>
          </div>
          <div className="mx-auto mt-6 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                      <feature.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
