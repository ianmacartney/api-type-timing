export type ComplexType7 = {
  middleware: Array<{
    name: string;
    handler: (ctx: Record<string, any>) => Promise<void>;
  }>;
};

export const module7Export = {
  registerMiddleware: (name: string) => {},
};
