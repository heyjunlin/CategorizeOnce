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
export default function ChooseIdentifier({
  isNewUser,
  mappingRules,
  dataExample,
  csvColumns,
  nextStep,
  setIdentifier,
}) {
  const [selectedColumn, setSelectedColumn] = useState("");

  useEffect(
    function suggestIdentifier() {
      if (csvColumns && csvColumns.length > 0) {
        // Choose a smart default - look for description/merchant columns
        const descriptionColumn = csvColumns.find(
          (col) =>
            col.toLowerCase().includes("desc") ||
            col.toLowerCase().includes("merch") ||
            col.toLowerCase().includes("narr") ||
            col.toLowerCase().includes("paye") ||
            col.toLowerCase().includes("beneficiary") ||
            col.toLowerCase().includes("party") ||
            col.toLowerCase().includes("memo"),
        );
        if (descriptionColumn) {
          setSelectedColumn(descriptionColumn);
          // console.log("Default selected identifier:", descriptionColumn);
        }
      }
    },
    [csvColumns],
  );

  const RADIO_GROUP_NAME = "category-column";

  var exampleRuleName, exampleRuleValue;
  if (!isNewUser) {
    [[exampleRuleName, exampleRuleValue]] = Object.entries(mappingRules);
  }
  function handleRadioChange(e) {
    setSelectedColumn(e.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (selectedColumn) {
      setIdentifier(selectedColumn);
      event.target.reset();
      nextStep();
    } else {
      alert("Please select a column");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="border-gray-900/10 pb-12 dark:border-white/10">
        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
          {isNewUser
            ? "Which column did you base on to categorize the expense?"
            : "Which column do you want to apply the mapping rules?"}
        </h2>
        <div className="mt-6 space-y-6">
          {/* Radio buttons for each column name */}
          {csvColumns.map((column) => (
            <div className="group flex items-center gap-x-3" key={column}>
              <input
                type="radio"
                id={column}
                name={RADIO_GROUP_NAME}
                value={column}
                checked={column === selectedColumn}
                onChange={handleRadioChange}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
              />
              <label
                htmlFor={column}
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                {column}
              </label>
              <p className="hidden rounded-md bg-green-50 p-4 text-sm/6 text-green-700 group-has-[:checked]:inline-block dark:bg-green-500/10 dark:text-gray-400 dark:outline dark:outline-green-500/20">
                Rules like{" "}
                <strong>
                  "if {column} is{" "}
                  {!isNewUser ? exampleRuleName : dataExample[column]},
                  categorize the transaction as{" "}
                  {!isNewUser ? exampleRuleValue : dataExample["CO_category"]}
                </strong>
                " will be {!isNewUser ? "applied" : "created"}.
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
      >
        {!isNewUser ? "Apply mapping rules" : "Finish"}
      </button>
    </form>
  );
}
