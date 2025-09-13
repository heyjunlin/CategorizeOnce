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

export function getMappingRulesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("co:expense_mapping_rules")) || {};
}

export function setMappingRulesToLocalStorage(rules) {
  if (typeof rules != "object" || rules === null) {
    console.log("Invalid mapping rules format");
    return;
  }
  localStorage.setItem("co:expense_mapping_rules", JSON.stringify(rules));
}

export function addMappingRulesToLocalStorage(rules) {
  var existingRules = {};
  try {
    existingRules = getMappingRulesFromLocalStorage();
  } catch (e) {
    console.error("Error getting existing mapping rules:", e);
  }
  const updatedRules = { ...existingRules, ...rules };
  setMappingRulesToLocalStorage(updatedRules);
}

export function clearMappingRulesFromLocalStorage() {
  localStorage.removeItem("co:expense_mapping_rules");
}
