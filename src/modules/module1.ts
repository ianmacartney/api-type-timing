// Simulate a heavy module with complex types
export type ComplexType1 = {
  field1: string;
  field2: number;
  field3: {
    nested1: string;
    nested2: Array<{ id: string; data: Record<string, any> }>;
  };
  field4: Map<string, Set<number>>;
  field5: Promise<{ result: string; metadata: Record<string, unknown> }>;
};

export type FunctionReference1<T = any> = {
  name: string;
  args: T;
  returns: unknown;
};

export const module1Export = {
  someFunction: () => ({ status: "ok" as const }),
  anotherFunction: (x: number) => x * 2,
};
