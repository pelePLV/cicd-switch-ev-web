export interface ListResponse<T> {
  list: T[];
  count: number;
}

export interface ApiResponse<T> {
  msg: string;
  code: string | number;
  data: T;
}
