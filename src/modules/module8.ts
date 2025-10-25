export type ComplexType8 = {
  serializer: {
    serialize: <T>(value: T) => string;
    deserialize: <T>(str: string) => T;
  };
};

export const module8Export = {
  toJSON: (obj: unknown) => JSON.stringify(obj),
};
