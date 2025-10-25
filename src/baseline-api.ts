// Baseline: Simple type export with no extra imports

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

// The type we're interested in - similar to ComponentApi
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
