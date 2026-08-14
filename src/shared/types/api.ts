export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

export interface ApiPaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta?: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}
