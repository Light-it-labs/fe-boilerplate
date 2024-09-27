export type RequestParams<T> = {
  searchText?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: T;
  with?: string | string[];
};

export type ServicePagination = {
  count: number;
  currentPage: number;
  links: { next: string; previous: string };
  perPage: number;
  total: number;
  totalPages: number;
};

export type ServiceResponse<T> = {
  data: T;
  pagination: ServicePagination;
  status: number;
  success: boolean;
};
