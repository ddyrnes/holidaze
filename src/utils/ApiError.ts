export class ApiError extends Error {
  status: number;
  statusText: string;
  errors: { message: string }[];

  constructor(
    status: number,
    statusText: string,
    errors: { message: string }[] = []
  ) {
    const message = errors[0]?.message || statusText || "An error occurred";
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.errors = errors;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

