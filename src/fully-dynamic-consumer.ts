import type { ComponentApi } from "./fully-dynamic-api.js";

// Simulate using the imported type
export type MyComponentApi = ComponentApi<"myComponent">;

export function useApi(api: MyComponentApi) {
  // Some function that uses the API type
  return api.apiKeys.destroy;
}

// Add more usage to ensure TS actually analyzes this
export type ApiKeysApi = MyComponentApi["apiKeys"];
export type DestroyFunction = ApiKeysApi["destroy"];
export type DestroyArgs = DestroyFunction["_args"];
export type DestroyReturns = DestroyFunction["_returnType"];
