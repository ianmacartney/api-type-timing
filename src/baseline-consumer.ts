import type { ComponentApi } from "./baseline-api.js";

// Simulate using the imported type
export type MyComponentApi = ComponentApi<"myComponent">;

export function useApi(api: MyComponentApi) {
  // Some function that uses the API type
  return api.agent.apiKeys.destroy;
}

// Add more usage to ensure TS actually analyzes this
export type ChunksApi = MyComponentApi["agent"]["apiKeys"];
export type DestroyFunction = ChunksApi["destroy"];
export type DestroyArgs = DestroyFunction["_args"];
export type DestroyReturns = DestroyFunction["_returns"];
