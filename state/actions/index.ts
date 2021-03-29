export interface Action {
  type: string;
}

export type DispatchAction<A> = {
  (action: { type: string } & A): void
}
