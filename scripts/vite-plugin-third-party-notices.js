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

import fs from "fs";
import path from "path";
import process from "process";

const OUTPUT_NAME = "THIRD-PARTY-NOTICES.txt";

// Filenames packages conventionally use for their license text.
const LICENSE_FILE_PATTERN = /^(LICENSE|LICENCE|COPYING)(\.(md|txt))?$/i;

// Tailwind compiles to CSS rather than into the JS module graph, but its
// preflight rules are copied verbatim into the stylesheet we ship, so it is
// redistributed all the same. The build asserts this is still true.
const CSS_ONLY_PACKAGES = ["tailwindcss"];

function packageNameFromId(id) {
  const match = id
    .replace(/\\/g, "/")
    .match(/node_modules\/((?:@[^/]+\/)?[^/]+)/);
  return match ? match[1] : null;
}

function findPackageDir(name) {
  // Walk up from the working directory so nested node_modules still resolve.
  let dir = process.cwd();
  for (;;) {
    const candidate = path.join(dir, "node_modules", name);
    if (fs.existsSync(path.join(candidate, "package.json"))) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function readLicense(name) {
  const dir = findPackageDir(name);
  if (!dir) return { error: `${name}: package directory not found` };

  const manifest = JSON.parse(
    fs.readFileSync(path.join(dir, "package.json"), "utf8"),
  );

  const licenseFile = fs
    .readdirSync(dir)
    .find((f) => LICENSE_FILE_PATTERN.test(f));
  if (!licenseFile) {
    // The `license` field is metadata; the file is the operative text. Without
    // the file we cannot reproduce the notice, so refuse rather than guess.
    return { error: `${name}@${manifest.version}: no license file found` };
  }

  // Apache-2.0 section 4(d) requires carrying a dependency's NOTICE forward.
  const noticeFile = fs
    .readdirSync(dir)
    .find((f) => /^NOTICE(\.(md|txt))?$/i.test(f));

  const repository =
    typeof manifest.repository === "string"
      ? manifest.repository
      : manifest.repository?.url || "";

  return {
    name,
    version: manifest.version || "unknown",
    declared: manifest.license || "see license text",
    repository: repository.replace(/^git\+/, "").replace(/\.git$/, ""),
    text: fs.readFileSync(path.join(dir, licenseFile), "utf8").trimEnd(),
    notice: noticeFile
      ? fs.readFileSync(path.join(dir, noticeFile), "utf8").trimEnd()
      : null,
  };
}

function render(entries) {
  // Group by identical license text: eight packages sharing the Apache-2.0
  // text should not mean eight copies of it.
  const groups = new Map();
  for (const entry of entries) {
    const existing = groups.get(entry.text);
    if (existing) existing.push(entry);
    else groups.set(entry.text, [entry]);
  }

  const rule = "=".repeat(78);
  let out = "";
  out += "Third-Party Software Attributions\n";
  out += `${rule}\n\n`;
  out +=
    "CategorizeOnce is distributed as a browser application that bundles the\n";
  out +=
    "open-source packages listed below. Each remains subject to its own license,\n";
  out += "reproduced here in full.\n\n";
  out +=
    "Generated during the build from the packages that actually contribute code\n";
  out += "to the shipped bundle. Do not edit by hand.\n\n";
  out += `Packages: ${entries.length}   Distinct licenses: ${groups.size}\n\n`;

  for (const [text, members] of groups) {
    out += `${rule}\n`;
    out += `${members[0].declared}\n`;
    out += `${rule}\n\n`;
    out +=
      members.length === 1
        ? "Applies to:\n"
        : `Applies to ${members.length} packages:\n`;
    for (const m of members) {
      out += `  ${m.name}@${m.version}`;
      if (m.repository) out += `\n      ${m.repository}`;
      out += "\n";
    }
    out += `\n${text}\n\n`;
    for (const m of members.filter((x) => x.notice)) {
      out += `NOTICE file from ${m.name}@${m.version}:\n\n${m.notice}\n\n`;
    }
  }

  return out;
}

export default function thirdPartyNotices() {
  return {
    name: "third-party-notices",
    apply: "build",

    generateBundle(_options, bundle) {
      // A package is redistributed only if its code survives tree-shaking, so
      // count rendered bytes rather than trusting the dependency tree.
      const shipped = new Set();
      for (const file of Object.values(bundle)) {
        for (const [id, info] of Object.entries(file.modules || {})) {
          if (!info.renderedLength) continue;
          const name = packageNameFromId(id);
          if (name) shipped.add(name);
        }
      }

      const css = Object.values(bundle)
        .filter((f) => f.fileName.endsWith(".css"))
        .map((f) => f.source)
        .join("");
      for (const name of CSS_ONLY_PACKAGES) {
        if (css.includes(name)) shipped.add(name);
        else
          this.warn(
            `${name} is listed as a CSS-only dependency but no longer appears ` +
              `in the stylesheet; remove it from CSS_ONLY_PACKAGES.`,
          );
      }

      const entries = [];
      const errors = [];
      for (const name of [...shipped].sort()) {
        const result = readLicense(name);
        if (result.error) errors.push(result.error);
        else entries.push(result);
      }

      // Silence is the failure mode we cannot detect later, so stop the build.
      if (errors.length) {
        this.error(
          `Cannot produce ${OUTPUT_NAME}; license text missing for:\n  ` +
            errors.join("\n  "),
        );
      }

      const output = render(entries);

      this.emitFile({ type: "asset", fileName: OUTPUT_NAME, source: output });

      // Also keep the copy the README links to in step with the build.
      fs.writeFileSync(path.join(process.cwd(), OUTPUT_NAME), output);

      this.info(
        `${OUTPUT_NAME}: ${entries.length} packages, ` +
          `${new Set(entries.map((e) => e.text)).size} distinct licenses`,
      );
    },
  };
}
