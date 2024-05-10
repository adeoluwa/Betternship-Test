import { Response } from "express";

class SuccessResponse {
  public sendSuccessResponse(
    res: Response,
    data: any,
    message?: string | null,
    statusCode?: number | null
  ){
    return res.status(200 || statusCode).json({
      status:'success',
      data,
      message,
      statusCode
    })
  };
}

export default SuccessResponse