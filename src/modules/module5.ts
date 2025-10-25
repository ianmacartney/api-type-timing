export type ComplexType5 = {
  cache: Map<string, { value: unknown; expiry: number }>;
  storage: {
    get: <T>(key: string) => Promise<T | null>;
    set: <T>(key: string, value: T) => Promise<void>;
  };
};

export const module5Export = {
  cacheGet: (key: string) => null,
  cacheSet: (key: string, value: unknown) => {},
};
