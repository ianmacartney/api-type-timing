// Scenario: Using dynamic import() syntax instead of import type
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

export type ApiFromModules<Modules extends Record<string, any>> = {
  [K in keyof Modules]: Modules[K];
};

// Using dynamic imports instead of static type imports
declare const fullApi: ApiFromModules<{
  module1: typeof import("./modules/module1.js");
  module2: typeof import("./modules/module2.js");
  module3: typeof import("./modules/module3.js");
  module4: typeof import("./modules/module4.js");
  module5: typeof import("./modules/module5.js");
  module6: typeof import("./modules/module6.js");
  module7: typeof import("./modules/module7.js");
  module8: typeof import("./modules/module8.js");
}>;

// The type we actually export
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
