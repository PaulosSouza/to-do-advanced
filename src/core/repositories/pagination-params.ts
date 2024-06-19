export interface PaginationParams {
  itemsPerPage: number;
  currentPage: number;
  orderBy: string;
  order: 'asc' | 'desc';
}
