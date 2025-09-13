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

import { Link } from "@tanstack/react-router";
import CsvDropZone from "../CsvDropZone";

export default function ImportStatement({
  setCsvData,
  setCsvColumns,
  isNewUser,
  setFileName,
  nextStep,
}) {
  function handleCSVParseComplete(results) {
    const data = results.data.map((transaction, index) => {
      transaction["CO_id"] = index;
      transaction["CO_category"] = "";
      return transaction;
    });
    setCsvData(data);
    setCsvColumns(results.meta.fields);
    nextStep();
  }

  return (
    <>
      {/* Quick Start Tips */}
      <div
        className={`${!isNewUser ? "hidden" : ""} bg-white shadow-sm sm:rounded-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10`}
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            You don't have to start from scratch
          </h3>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              If you have previously categorized statements, CategorizeOnce can
              extract mapping rules from them to give you a head start.
            </p>
          </div>
          <div className="mt-3 text-sm/6">
            <Link
              to="/importrules"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Import rules from my old files
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      {/* File Drop Zone */}
      <CsvDropZone
        handleCSVParseComplete={handleCSVParseComplete}
        setFileName={setFileName}
      />
    </>
  );
}
