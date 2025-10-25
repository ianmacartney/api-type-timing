// Scenario: Imports that are completely unused (no fullApi reference)
import type * as module1 from "./modules/module1.js";
import type * as module2 from "./modules/module2.js";
import type * as module3 from "./modules/module3.js";
import type * as module4 from "./modules/module4.js";
import type * as module5 from "./modules/module5.js";
import type * as module6 from "./modules/module6.js";
import type * as module7 from "./modules/module7.js";
import type * as module8 from "./modules/module8.js";

export type FunctionReference<
  Type extends string,
  Visibility extends string,
  Args,
  Returns,
  Name extends string | undefined = string | undefined
> = {
  _type: Type;
  _visibility: Visibility;
  _args: Args;
  _returns: Returns;
  _name: Name;
};

// The imports exist but are never used anywhere

export type ComponentApi<Name extends string | undefined = string | undefined> = {
  chunks: {
    insert: FunctionReference<
      "mutation",
      "public",
      {
        chunks: Array<{
          content: { metadata?: Record<string, any>; text: string };
          embedding: Array<number>;
          searchableText?: string;
        }>;
        entryId: string;
        startOrder: number;
      },
      { status: "pending" | "ready" | "replaced" },
      Name
    >;
    query: FunctionReference<
      "query",
      "public",
      { entryId: string },
      Array<{ id: string; text: string }>,
      Name
    >;
  };
  entries: {
    create: FunctionReference<
      "mutation",
      "public",
      { name: string; data: Record<string, any> },
      { id: string },
      Name
    >;
    get: FunctionReference<"query", "public", { id: string }, { name: string; data: any }, Name>;
  };
};
