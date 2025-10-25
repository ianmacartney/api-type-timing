# TypeScript Import Performance Test

This project tests the performance impact of different import patterns on TypeScript's type checking and inference.

## Test Scenarios

### 1. Baseline (no imports)
A simple type definition file with no imports at all. This serves as our control.

### 2. Type imports (used in fullApi)
Type imports that are referenced in a `fullApi` type but NOT used in the exported `ComponentApi` type.
```ts
import type * as module1 from "./modules/module1.js";
// ... more imports
declare const fullApi: ApiFromModules<{ module1: typeof module1, ... }>;
export type ComponentApi = { ... }; // Does not depend on fullApi
```

### 3. Dynamic imports (typeof import())
Same scenario but using dynamic import syntax instead of static imports:
```ts
declare const fullApi: ApiFromModules<{
  module1: typeof import("./modules/module1.js");
  // ...
}>;
```

### 4. Unused type imports
Type imports that exist but are never referenced anywhere in the file.

## Results

Based on the test run:

| Scenario | Avg Time | Impact vs Baseline |
|----------|----------|-------------------|
| Baseline (no imports) | 328.12ms | - |
| Type imports (used in fullApi) | 333.34ms | +1.6% |
| Dynamic imports (typeof import()) | 329.73ms | +0.5% |
| Unused type imports | 325.34ms | -0.8% |

## Key Findings

1. **Minimal Performance Impact**: All scenarios performed within ~3% of each other, which is within the noise margin.

2. **Type Imports vs Dynamic Imports**: Dynamic imports (`typeof import()`) showed slightly better performance (+0.5%) compared to static type imports (+1.6%), though the difference is negligible.

3. **Unused Imports**: Even completely unused type imports had virtually no impact on performance (-0.8%, essentially noise).

4. **TypeScript is Smart**: TypeScript's type checker appears to efficiently handle unused imports and doesn't process types that aren't actually referenced in the consumer code.

## Conclusion

**Your original question**: Will having a bunch of type imports in a file impact TypeScript inference time when importing just a type that doesn't depend on those imports?

**Answer**: No, the impact is negligible (< 2%). TypeScript is smart enough to avoid processing types that aren't actually used by the code being analyzed.

## Implications for Your Use Case

For your `ComponentApi` export from the workpool package:

1. Having imports for `fullApi` that aren't used by `ComponentApi` adds only ~1.6% overhead
2. Using `typeof import()` instead of `import type` is slightly more efficient but the difference is minimal
3. The static generation approach you're considering will help, but the performance gain from removing these imports would be very small

## Running the Tests

```bash
npm install
npm test          # Run all tests and show comparison
npm run compare   # Just show comparison from previous runs
```

Each test runs 10 iterations to account for variance, and the first iteration (which includes initial parsing overhead) tends to be slower.

## Test Methodology

The test uses TypeScript's compiler API to:
1. Create a program with the consumer file as the entry point
2. Force type checking by getting diagnostics
3. Visit all nodes and get types to ensure full analysis
4. Measure the time taken for the entire process

This simulates what happens when TypeScript analyzes your code in an IDE or during a build.
