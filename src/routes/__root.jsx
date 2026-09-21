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

import { Suspense, lazy } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: RootComponent,
});
import Nav from "../components/Nav";
import SunsetBanner from "../components/SunsetBanner";

// Kept out of production builds entirely: a static import would leave the
// devtools stub in the bundle, which means shipping a devDependency.
const Devtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    );

function RootComponent() {
  return (
    <>
      <div className="min-h-full">
        <SunsetBanner />
        <Nav />
        <Outlet />
      </div>
      <Suspense>
        <Devtools />
      </Suspense>
    </>
  );
}
