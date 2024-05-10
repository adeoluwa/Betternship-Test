import ExceptionHandler from "../utils/ExceptionHandler";
import HttpStatusCode from "./HttpResponse";

class Validator {
  static RequestValidationError(payload: any) {
    return new ExceptionHandler(
      "Request Validation Error",
      HttpStatusCode.HTTP_BAD_REQUEST,
      payload
    );
  }
}

export default Validator;
