import type { ApiErrorResponse } from './generated/models/apiErrorResponse';
export class ApiError extends Error {
  readonly payload: ApiErrorResponse;
  readonly status: number;
  constructor(payload: ApiErrorResponse, status: number) { super(payload.error.message); this.payload = payload; this.status = status; }
}
export async function thekeFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(import.meta.env.VITE_API_URL + url, options);
  const body = await response.json() as unknown;
  if (!response.ok) throw new ApiError(body as ApiErrorResponse, response.status);
  return { data: body, status: response.status, headers: response.headers } as T;
}
