export type ComplexType4 = {
  queryBuilder: {
    select: <T>(fields: T[]) => { fields: T[] };
    where: (condition: Record<string, unknown>) => { condition: Record<string, unknown> };
  };
};

export const module4Export = {
  query: () => ({ data: [] }),
};
