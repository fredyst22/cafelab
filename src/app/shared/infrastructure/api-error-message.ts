import { HttpErrorResponse } from '@angular/common/http';

/** Marcador en {@link Error.message} cuando la API respondió 401/403 sin cuerpo útil (p. ej. Spring Security). */
export const API_ERROR_UNAUTHORIZED = 'HTTP_UNAUTHORIZED';

/**
 * Texto legible para mostrar al usuario a partir de un fallo de API.
 * Cubre Error lanzado por {@link BaseService}, HttpErrorResponse crudo y cuerpos tipo Spring.
 */
export function getUserFacingApiMessage(
  error: unknown,
  fallback: string,
  unauthorizedMessage?: string,
): string {
  if (error instanceof Error && error.message === API_ERROR_UNAUTHORIZED) {
    return unauthorizedMessage?.trim() ? unauthorizedMessage : fallback;
  }
  if (error instanceof HttpErrorResponse) {
    return extractFromHttpError(error) || fallback;
  }
  if (error instanceof Error && error.message && error.message !== 'Request failed') {
    return error.message;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    const m = String((error as { message?: string }).message);
    if (m && m !== 'Request failed') {
      return m;
    }
  }
  return fallback;
}

function extractFromHttpError(error: HttpErrorResponse): string {
  const body = error.error;
  if (body instanceof ErrorEvent) {
    return body.message;
  }
  if (typeof body === 'string' && body.trim()) {
    return body.trim();
  }
  if (body && typeof body === 'object') {
    const o = body as Record<string, unknown>;
    const errs = o['errors'];
    if (Array.isArray(errs)) {
      const parts = (
        errs as Array<{
          defaultMessage?: string;
          message?: string;
          field?: string;
        }>
      )
        .map((x) => x.defaultMessage || x.message)
        .filter(Boolean);
      if (parts.length) {
        return parts.join('. ');
      }
    }
    const msg = o['message'];
    if (typeof msg === 'string' && msg.trim()) {
      return msg.trim();
    }
    const detail = o['detail'];
    if (typeof detail === 'string' && detail.trim()) {
      return detail.trim();
    }
  }
  if (error.status === 0) {
    return '';
  }
  if (error.message) {
    return error.message;
  }
  return '';
}