import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LICENSE_HEADER = `/*
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

`;

// File extensions to process
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".css"];

async function addLicenseHeader(filePath) {
  try {
    // Read the file content
    const content = await fs.readFile(filePath, "utf8");

    // Check if the license header is already present
    if (content.includes("Licensed under the Apache License")) {
      console.log(`License already exists in: ${filePath}`);
      return;
    }

    // Add the header
    const newContent = LICENSE_HEADER + content;
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(`Added license to: ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err}`);
  }
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip node_modules and .git directories
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".git") {
          await processDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (EXTENSIONS.includes(ext)) {
          await addLicenseHeader(fullPath);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dir}: ${err}`);
  }
}

// Start processing from the src directory
processDirectory(path.join(__dirname, "src"))
  .then(() => console.log("License header addition completed!"))
  .catch((err) => console.error("Error:", err));
