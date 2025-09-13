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
import { useState, useEffect } from "react";
import ImportStatement from "../components/categorization/ImportStatement";
import TransactionTable from "../components/categorization/TransactionTable";
import ChooseIdentifier from "../components/categorization/ChooseIdentifier";
import FinishCategorization from "../components/categorization/FinishCategorization";
import { getMappingRulesFromLocalStorage } from "../utils/mappingRules";

export const Route = createFileRoute("/categorize")({
  component: CategorizeComponent,
});

function CategorizeComponent() {
  const [csvData, setCsvData] = useState(null);
  const [csvColumns, setCsvColumns] = useState([]);
  const [identifier, setIdentifier] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [mappingRules, setMappingRules] = useState({});
  const [fileName, setFileName] = useState("");
  useEffect(function populateMappingRules() {
    try {
      const rules = getMappingRulesFromLocalStorage();
      setMappingRules(rules);
    } catch (error) {
      console.error("Can't populate mapping rules:", error);
    }
  }, []);

  const isNewUser = Object.keys(mappingRules).length === 0;
  const dataExample =
    csvData && Object.keys(csvData).length > 0 ? csvData.slice(-1)[0] : null;
  const components = {
    importStatement: {
      component: ImportStatement,
      props: { setCsvData, setCsvColumns, isNewUser, setFileName },
    },
    transactionTable: {
      component: TransactionTable,
      props: {
        csvData,
        csvColumns,
        identifier,
        mappingRules,
        setCsvData,
      },
    },
    chooseIdentifier: {
      component: ChooseIdentifier,
      props: {
        isNewUser,
        mappingRules,
        dataExample,
        csvColumns,
        setIdentifier,
      },
    },
    finishCategorization: {
      component: FinishCategorization,
      props: { identifier, csvData, fileName, setMappingRules },
    },
  };
  const steps = isNewUser
    ? [
        components.importStatement,
        components.transactionTable,
        components.chooseIdentifier,
        components.finishCategorization,
      ]
    : [
        components.importStatement,
        components.chooseIdentifier,
        components.transactionTable,
        components.finishCategorization,
      ];

  function nextStep() {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  }
  function previousStep() {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  }
  const Current = steps[currentStep].component;
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Categorize Transactions
              </h1>
            </div>
          </header>
          <main className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
            <Current
              {...steps[currentStep].props}
              previousStep={previousStep}
              nextStep={nextStep}
            />
          </main>
        </div>
      </div>
    </>
  );
}
