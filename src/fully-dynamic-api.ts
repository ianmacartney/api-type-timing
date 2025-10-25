/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  Expand,
  FilterApi,
  FunctionReference,
} from "convex/server";
import { GenericId } from "convex/values";

export type OpaqueIds<T> =
  T extends GenericId<infer _T>
    ? string
    : T extends string
      ? `${T}` extends T
        ? T
        : string
      : T extends (infer U)[]
        ? OpaqueIds<U>[]
        : T extends ArrayBuffer
          ? ArrayBuffer
          : T extends object
            ? { [K in keyof T]: OpaqueIds<T[K]> }
            : T;

export type UseApi<API> = Expand<{
  [mod in keyof API]: API[mod] extends FunctionReference<
    infer FType,
    "public",
    infer FArgs,
    infer FReturnType,
    infer FComponentPath
  >
    ? FunctionReference<
        FType,
        "internal",
        OpaqueIds<FArgs>,
        OpaqueIds<FReturnType>,
        FComponentPath
      >
    : UseApi<API[mod]>;
}>;

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  chunks: typeof import("./modules/chunks.js");
  "embeddings/importance": typeof import("./modules/embeddings/importance.js");
  "embeddings/index": typeof import("./modules/embeddings/index.js");
  "embeddings/tables": typeof import("./modules/embeddings/tables.js");
  entries: typeof import("./modules/entries.js");
  filters: typeof import("./modules/filters.js");
  namespaces: typeof import("./modules/namespaces.js");
  search: typeof import("./modules/search.js");
}>;
// For now fullApiWithMounts is only fullApi which provides
// jump-to-definition in component client code.
// Use Mounts for the same type without the inference.
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export type ComponentApi<Name extends string | undefined = string | undefined> =
  UseApi<typeof api>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
