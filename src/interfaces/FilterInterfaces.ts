export interface BaseFilter {
  status?: boolean | null;
  sortBy?: "createdAt" | "updatedAt" | "-createdAt" | "-updatedAt";
  startCreatedAt?: Date;
  endCreatedAt?: Date;
  startUpdatedAt?: Date;
  endUpdatedAt?: Date;
}

export interface RouteFilter extends BaseFilter {
  title?: string;
}
