import { EntityManager } from 'typeorm';

export interface WithEntityManager {
  withEntityManager(entityManager: EntityManager): this;
}

type UnionToTuple<T> = (
  (T extends any ? (t: T) => T : never) extends infer U
    ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
      ? V
      : never
    : never
) extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

export type TransactionHandler<TResult, R> = (services: R) => Promise<TResult>;

export async function withEntityManager<TResult, R extends WithEntityManager>(
  entityManager: EntityManager,
  transactionHandler: (services: UnionToTuple<R>) => Promise<TResult>,
  ...services: R[]
): Promise<TResult> {
  return entityManager.transaction(async (em) => {
    return transactionHandler(
      (services as any).map((service) => service.withEntityManager(em)),
    );
  });
}
