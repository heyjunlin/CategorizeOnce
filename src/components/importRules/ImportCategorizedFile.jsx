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

import CsvDropZone from "../CsvDropZone";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function ImportCategorizedFile({
  setCsvColumns,
  setCsvData,
  setFileName,
}) {
  function handleCSVParseComplete(results) {
    setCsvData(results.data);
    const columns = results.meta.fields.filter((field) => field.trim() !== "");
    setCsvColumns(columns);
  }
  return (
    <>
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
              How does CategorizeOnce extract mapping rules from my old files?
            </span>
          </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" className="mt-2 mb-4 pr-12">
          <p className="text-base/7 text-gray-600 dark:text-gray-400">
            Choose a file that you categorized before. CategorizeOnce will let
            you specify which columns contain the payee/payer and category. Then
            it will create new mapping rules from them.
          </p>
        </DisclosurePanel>
      </Disclosure>
      <CsvDropZone
        handleCSVParseComplete={handleCSVParseComplete}
        setFileName={setFileName}
      />
    </>
  );
}
