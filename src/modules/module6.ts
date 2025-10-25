export type ComplexType6 = {
  eventBus: {
    emit: <T>(event: string, data: T) => void;
    on: <T>(event: string, handler: (data: T) => void) => () => void;
  };
};

export const module6Export = {
  emitEvent: (name: string) => {},
};
