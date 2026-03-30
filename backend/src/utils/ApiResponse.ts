export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data?: T;
  public errors?: any;

  constructor(success: boolean, message: string, data?: T, errors?: any) {
    this.success = success;
    this.message = message;
    if (data !== undefined) this.data = data;
    if (errors !== undefined) this.errors = errors;
  }

  static success<T>(message: string, data?: T) {
    return new ApiResponse<T>(true, message, data);
  }

  static error(message: string, errors?: any) {
    return new ApiResponse<null>(false, message, undefined, errors);
  }
}
