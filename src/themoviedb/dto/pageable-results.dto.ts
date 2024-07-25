export interface PageableResults<T> {
  total_pages: number;
  total_results: boolean;
  results: Array<T>;
}
