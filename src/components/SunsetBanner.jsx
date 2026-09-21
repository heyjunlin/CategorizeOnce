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

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";

// The shutdown only concerns the hosted site; a self-hosted copy keeps working.
const HOSTED_DOMAIN = "categorizeonce.com";

export default function SunsetBanner() {
  const hostname =
    typeof window === "undefined" ? "" : window.location.hostname;
  if (hostname !== HOSTED_DOMAIN && hostname !== `www.${HOSTED_DOMAIN}`) {
    return null;
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50 dark:border-amber-400/20 dark:bg-amber-400/10">
      <div className="mx-auto flex max-w-7xl gap-x-3 px-4 py-3 sm:px-6 lg:px-8">
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-amber-500 dark:text-amber-400"
        />
        <p className="text-sm text-amber-900 dark:text-amber-200">
          <span className="font-semibold">
            categorizeonce.com is shutting down on 1 September 2027.
          </span>{" "}
          Please{" "}
          <Link
            to="/mappingrules"
            className="font-semibold underline hover:no-underline"
          >
            download your mapping rules and clear them from this browser
          </Link>{" "}
          before that date — the domain will change hands, and rules left in
          this browser could be read by whoever owns it next. CategorizeOnce
          itself isn&apos;t going away: it now lives at{" "}
          <a
            href="https://heyjunlin.github.io/CategorizeOnce/"
            className="font-semibold underline hover:no-underline"
          >
            heyjunlin.github.io/CategorizeOnce
          </a>
          , where you can import the rules you just downloaded, or you can{" "}
          <a
            href="https://github.com/heyjunlin/CategorizeOnce"
            className="font-semibold underline hover:no-underline"
          >
            run it on your own machine
          </a>
          .
        </p>
      </div>
    </div>
  );
}
