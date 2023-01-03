// 400 - bad requests
// 401 - unauthorized, saprevious endpoint nakapagaccess ka, after logout, ininput mo ulit, di na pwede.
// 403 - access denied, input validations, forbidden.
// 404 - not found in the server you are looking for.
// 500 - internal server error.
// internal error
// error if no routes accept the error;

class ApiError {
  code: number;

  message: string;

  constructor(code: number, message: string) {
    // eto yung irereturn mo, gantong itsura
    this.code = code;
    this.message = message;
  }

  static badRequest(msg: string) {
    // file typers, invalid texts, invalid inputs
    return new ApiError(400, msg);
  }

  static notFound(msg: string) {
    // endpoint not found
    return new ApiError(404, msg);
  }

  static internalError(msg: string) {
    // internal error
    return new ApiError(500, msg);
  }

  static unauthorizedAccess(msg: string) {
    // logout then access back again
    return new ApiError(401, msg);
  }

  static limitedAccess(msg: string) {
    // limited access
    return new ApiError(403, msg);
  }
}

export default ApiError;
