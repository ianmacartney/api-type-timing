import type { ComponentApi } from "./unused-imports-api.js";

// Simulate using the imported type
export type MyComponentApi = ComponentApi<"myComponent">;

export function useApi(api: MyComponentApi) {
  // Some function that uses the API type
  return api.chunks.insert;
}

// Add more usage to ensure TS actually analyzes this
export type ChunksApi = MyComponentApi["chunks"];
export type InsertFunction = ChunksApi["insert"];
export type InsertArgs = InsertFunction["_args"];
export type InsertReturns = InsertFunction["_returns"];
