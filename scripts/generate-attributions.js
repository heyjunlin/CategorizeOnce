import fs from "fs/promises";
import path from "path";
import process from "process";

async function generateAttributions() {
  try {
    // Read package.json to get direct dependencies (excluding devDependencies)
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

    // Get only production dependencies
    const productionDeps = Object.keys(packageJson.dependencies || {});

    console.log(
      `Found ${productionDeps.length} production dependencies to process`,
    );

    // Get detailed info about installed packages - using a different approach
    let attributions = `# Third-Party Software Attributions\n\n`;
    attributions += `This project includes components from the following third-party software that\n`;
    attributions += `are subject to separate license terms. Your use of these components is subject\n`;
    attributions += `to the terms and conditions of their respective licenses.\n\n`;

    // Process each dependency manually since npm ls might be having issues
    for (const name of productionDeps) {
      try {
        // Try to get package info directly from node_modules
        const packagePath = path.join(
          process.cwd(),
          "node_modules",
          name,
          "package.json",
        );
        const packageInfo = JSON.parse(await fs.readFile(packagePath, "utf8"));

        console.log(`Processing ${name}@${packageInfo.version}`);

        // Extract license info
        const license = packageInfo.license || "Unknown";
        attributions += `## ${name}@${packageInfo.version || "unknown"} - ${license} License\n`;

        // Extract author info
        if (packageInfo.author) {
          const authorText =
            typeof packageInfo.author === "string"
              ? packageInfo.author
              : packageInfo.author.name || "";
          attributions += `Copyright (c) ${authorText}\n\n`;
        } else {
          attributions += `Copyright holder information not available\n\n`;
        }

        // Add repository info if available
        if (packageInfo.repository) {
          const repoUrl =
            typeof packageInfo.repository === "string"
              ? packageInfo.repository
              : packageInfo.repository.url || "";

          // Clean up repository URL (remove git+ prefix and .git suffix)
          const cleanUrl = repoUrl.replace("git+", "").replace(/\.git$/, "");
          attributions += `Repository: ${cleanUrl}\n\n`;
        }
      } catch (pkgError) {
        console.warn(`Warning: Could not process ${name}: ${pkgError.message}`);
        attributions += `## ${name} - License information unavailable\n\n`;
      }
    }

    // Write to file
    await fs.writeFile("THIRD-PARTY-NOTICES.txt", attributions);
    console.log(
      `Third-party attributions generated for ${productionDeps.length} packages!`,
    );
  } catch (error) {
    console.error("Error generating attributions:", error);
    process.exit(1);
  }
}

generateAttributions();
