// Another heavy module
export type ComplexType2 = {
  operationId: string;
  timestamp: number;
  payload: {
    items: Array<{
      id: string;
      type: "create" | "update" | "delete";
      changes: Record<string, { old: unknown; new: unknown }>;
    }>;
  };
};

export type FunctionReference2<T = any> = {
  module: string;
  operation: string;
  input: T;
  output: unknown;
};

export const module2Export = {
  processData: (data: string) => ({ processed: true, data }),
  validateInput: (input: unknown) => ({ valid: true }),
};
