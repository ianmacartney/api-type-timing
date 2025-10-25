import ts from "typescript";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scenarios = {
  baseline: {
    name: "Baseline (no imports)",
    file: "src/baseline-consumer.ts",
  },
  "type-imports": {
    name: "Type imports (used in fullApi)",
    file: "src/type-imports-consumer.ts",
  },
  "dynamic-imports": {
    name: "Dynamic imports (typeof import())",
    file: "src/dynamic-imports-consumer.ts",
  },
  "unused-imports": {
    name: "Unused type imports",
    file: "src/unused-imports-consumer.ts",
  },
};

const scenario = process.argv[2] || "baseline";

if (!scenarios[scenario]) {
  console.error(`Unknown scenario: ${scenario}`);
  console.error(`Available scenarios: ${Object.keys(scenarios).join(", ")}`);
  process.exit(1);
}

const config = scenarios[scenario];
console.log(`\n${"=".repeat(60)}`);
console.log(`Testing: ${config.name}`);
console.log(`${"=".repeat(60)}\n`);

// Read tsconfig
const configPath = join(__dirname, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  __dirname
);

// Create a program - this is what TS does when type checking
const iterations = 10;
const times = [];

for (let i = 0; i < iterations; i++) {
  const startTime = performance.now();

  const program = ts.createProgram({
    rootNames: [join(__dirname, config.file)],
    options: {
      ...parsedConfig.options,
      extendedDiagnostics: false, // Disable for cleaner measurement
    },
  });

  // Get diagnostics - this forces TS to analyze the file and its imports
  const sourceFile = program.getSourceFile(join(__dirname, config.file));
  const checker = program.getTypeChecker();

  // Force type checking by visiting nodes
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isTypeAliasDeclaration(node) || ts.isFunctionDeclaration(node)) {
      checker.getTypeAtLocation(node);
    }
  });

  const diagnostics = [
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics(),
    ...program.getDeclarationDiagnostics(),
  ];

  const endTime = performance.now();
  const elapsed = endTime - startTime;
  times.push(elapsed);

  if (diagnostics.length > 0) {
    console.log(`Iteration ${i + 1}: ${elapsed.toFixed(2)}ms (${diagnostics.length} diagnostics)`);
  } else {
    console.log(`Iteration ${i + 1}: ${elapsed.toFixed(2)}ms`);
  }
}

// Calculate statistics
const avg = times.reduce((a, b) => a + b, 0) / times.length;
const sorted = [...times].sort((a, b) => a - b);
const median = sorted[Math.floor(sorted.length / 2)];
const min = sorted[0];
const max = sorted[sorted.length - 1];
const stdDev = Math.sqrt(
  times.reduce((sum, time) => sum + Math.pow(time - avg, 2), 0) / times.length
);

console.log(`\n${"=".repeat(60)}`);
console.log("Results:");
console.log(`${"=".repeat(60)}`);
console.log(`Average:    ${avg.toFixed(2)}ms`);
console.log(`Median:     ${median.toFixed(2)}ms`);
console.log(`Min:        ${min.toFixed(2)}ms`);
console.log(`Max:        ${max.toFixed(2)}ms`);
console.log(`Std Dev:    ${stdDev.toFixed(2)}ms`);
console.log(`${"=".repeat(60)}\n`);

// Write results to a file for comparison
const resultsFile = join(__dirname, "results.json");
let allResults = {};
try {
  allResults = JSON.parse(readFileSync(resultsFile, "utf-8"));
} catch (e) {
  // File doesn't exist yet
}

allResults[scenario] = {
  name: config.name,
  avg,
  median,
  min,
  max,
  stdDev,
  times,
  timestamp: new Date().toISOString(),
};

writeFileSync(resultsFile, JSON.stringify(allResults, null, 2));
console.log(`Results written to ${resultsFile}\n`);
