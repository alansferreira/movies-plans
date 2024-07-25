export const DEFAULT_PAGE_SIZE = 10;
export interface PaginationDto {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  lastPage: boolean;
  firstPage: boolean;
}
export interface PaginationType<T> {
  data: Array<T>;
  pagination: PaginationDto;
}
