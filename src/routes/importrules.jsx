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
import ImportCategorizedFile from "../components/importRules/ImportCategorizedFile";
import BuildMappingRules from "../components/importRules/BuildMappingRules";
import Notification from "../components/Notification";

export const Route = createFileRoute("/importrules")({
  component: RouteComponent,
});

function RouteComponent() {
  const [csvData, setCsvData] = useState(null);
  const [csvColumns, setCsvColumns] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  function resetParentState() {
    setCsvData(null);
    setCsvColumns(null);
    setFileName("");
  }
  function handleNotificationOnImportSuccess() {
    setNotificationTitle("Successfully imported!");
    setNotificationMessage(
      "Mapping rules extracted from your file have been imported.",
    );
    setShowNotification(true);
  }
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Import Mapping Rules
              </h1>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {csvColumns ? (
              <BuildMappingRules
                csvColumns={csvColumns}
                csvData={csvData}
                fileName={fileName}
                resetParentState={resetParentState}
                notifyImportSuccess={handleNotificationOnImportSuccess}
              />
            ) : (
              <ImportCategorizedFile
                setCsvColumns={setCsvColumns}
                setCsvData={setCsvData}
                setFileName={setFileName}
              />
            )}
            {/* Additional components can be added here, e.g., a table to display imported data */}
          </main>
        </div>
      </div>
      <Notification
        title={notificationTitle}
        message={notificationMessage}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </>
  );
}
