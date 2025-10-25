import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resultsFile = join(__dirname, "results.json");

try {
  const results = JSON.parse(readFileSync(resultsFile, "utf-8"));

  console.log("\n" + "=".repeat(80));
  console.log("TypeScript Performance Comparison");
  console.log("=".repeat(80) + "\n");

  const scenarios = Object.entries(results);

  if (scenarios.length === 0) {
    console.log("No results found. Run the tests first with: npm test\n");
    process.exit(0);
  }

  // Print table header
  console.log(
    "Scenario".padEnd(35) +
      "Avg".padEnd(12) +
      "Median".padEnd(12) +
      "Min".padEnd(12) +
      "Max".padEnd(12)
  );
  console.log("-".repeat(80));

  // Print each scenario
  scenarios.forEach(([key, data]) => {
    console.log(
      data.name.padEnd(35) +
        `${data.avg.toFixed(2)}ms`.padEnd(12) +
        `${data.median.toFixed(2)}ms`.padEnd(12) +
        `${data.min.toFixed(2)}ms`.padEnd(12) +
        `${data.max.toFixed(2)}ms`.padEnd(12)
    );
  });

  console.log("-".repeat(80));

  // Calculate differences relative to baseline
  const baseline = results.baseline;
  if (baseline && scenarios.length > 1) {
    console.log("\nPerformance Impact (relative to baseline):");
    console.log("-".repeat(80));

    scenarios.forEach(([key, data]) => {
      if (key === "baseline") return;

      const avgDiff = data.avg - baseline.avg;
      const avgDiffPercent = ((avgDiff / baseline.avg) * 100).toFixed(1);
      const sign = avgDiff > 0 ? "+" : "";

      console.log(
        `${data.name.padEnd(35)} ${sign}${avgDiff.toFixed(2)}ms (${sign}${avgDiffPercent}%)`
      );
    });
  }

  console.log("\n" + "=".repeat(80) + "\n");
} catch (e) {
  console.error("Error reading results:", e.message);
  console.log("\nRun the tests first with: npm test\n");
  process.exit(1);
}
