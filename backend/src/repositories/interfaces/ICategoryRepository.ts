export interface ICategoryRepository {
  findAll(
    skip: number,
    take: number,
    orderByField: string,
    sortOrder: "asc" | "desc"
  ): Promise<any>;
}
