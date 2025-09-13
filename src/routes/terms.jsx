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

export const Route = createFileRoute("/terms")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="m:px-6 mx-auto max-w-7xl bg-white px-6 py-8 lg:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
        <h1 className="mt-2 mb-6 text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          Terms of Service
        </h1>
        <p>Effective Date: September 7, 2025</p>
        <p>
          Welcome to CategorizeOnce (the "App"). By using this free, open-source
          application, you agree to the following terms:
        </p>
        <h2 className="text-1xl mt-6 font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
          Use of the App
        </h2>
        <p>
          This app is provided for personal use, free of charge, under the
          open-source license included in the project repository. You may
          download, modify, and run the software according to the license terms.
        </p>
        <h2 className="text-1xl mt-6 font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
          No Financial Advice
        </h2>
        <p>
          This app is a tool to help categorize and manage transactions. It does
          not provide financial advice. You are solely responsible for reviewing
          your results and making your own financial decisions.
        </p>
        <h2 className="text-1xl mt-6 font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
          Disclaimer of Warranties
        </h2>
        <p>
          The app is provided “as is”, without warranty of any kind. We make no
          guarantees regarding accuracy, completeness, reliability, or fitness
          for a particular purpose.
        </p>
        <h2 className="text-1xl mt-6 font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
          Limitation of Liability
        </h2>
        <p>
          In no event shall the developer(s) be held liable for any claim,
          damages, or losses arising from the use of this app. You acknowledge
          that you use the app at your own risk.
        </p>
        <h2 className="text-1xl mt-6 font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
          Open-Source License
        </h2>
        <p>
          This app is distributed under the Apache License, Version 2.0. Please
          review the license for details on your rights and responsibilities.
        </p>
      </div>
    </div>
  );
}
