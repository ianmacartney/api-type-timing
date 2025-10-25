export type ComplexType3 = {
  entities: Map<
    string,
    {
      metadata: Record<string, any>;
      relations: Set<string>;
      attributes: Array<{ key: string; value: unknown; type: string }>;
    }
  >;
};

export const module3Export = {
  transform: (x: string) => x.toUpperCase(),
};
