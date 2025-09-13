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

import Papa from "papaparse";
import { TableCellsIcon } from "@heroicons/react/24/solid";

export default function CsvDropZone({
  dropZoneLabel = "Choose a CSV file",
  setFileName,
  handleFileInputError,
  handleFileDropError,
  handleCSVParseComplete,
  handleCSVParseError,
}) {
  // TODO: handle file input errors and file drop errors
  function parseCSV(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: handleCSVParseComplete,
      error:
        handleCSVParseError ||
        ((error) => {
          console.error("Error parsing CSV:", error);
          alert("Error parsing CSV file: " + error.message);
        }),
    });
  }

  function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    var file;
    // If the browser supports DataTransferItemList interface
    if (ev.dataTransfer.items) {
      file = ev.dataTransfer.items[0].getAsFile();
    } else {
      // Use DataTransfer interface to access the file(s)
      file = ev.dataTransfer.files[0];
    }
    // Check if the file is a CSV file
    if (file && file.type === "text/csv") {
      parseCSV(file);
      setFileName(file.name);
    } else {
      alert("Please drop a valid CSV file.");
    }
    ev.currentTarget.classList.remove("bg-indigo-50", "dark:bg-indigo-900/10");
  }

  function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    // Highlight the drop zone on the target
    ev.currentTarget.classList.add("bg-indigo-50", "dark:bg-indigo-900/10");
  }

  function dragLeaveHandler(ev) {
    // Remove the highlight from the drop zone
    ev.currentTarget.classList.remove("bg-indigo-50", "dark:bg-indigo-900/10");
  }

  function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit");
      return;
    }
    parseCSV(file);
    setFileName(file.name);
  }
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="csv-drop-zone"
          className="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          {dropZoneLabel}
        </label>
        <div
          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-white/25"
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          id="csv-drop-zone"
        >
          <div className="text-center">
            <TableCellsIcon
              aria-hidden="true"
              className="mx-auto size-12 text-gray-300 dark:text-gray-500"
            />
            <div className="mt-4 flex text-sm/6 text-gray-600 dark:text-gray-400">
              <label
                htmlFor="choose-file"
                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500 dark:bg-transparent dark:text-indigo-400 dark:focus-within:outline-indigo-500 dark:hover:text-indigo-400"
              >
                <span>Choose a CSV file</span>
                <input
                  id="choose-file"
                  name="choose-file"
                  type="file"
                  accept=".csv"
                  className="sr-only"
                  onChange={handleFileImport}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs/5 text-gray-600 dark:text-gray-400">
              File size up to 2MB
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
