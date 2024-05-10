import { Request, Response, NextFunction } from "express";
import ExceptionHandler from "../utils/ExceptionHandler";
import Helper from "../helpers";
import { UserProfileAttributes } from "../interfaces/model.interface";
import User from "../models/User";
import HttpStatusCode from "../helpers/HttpResponse"

// interface CustomRequest extends Request {
//   user?: UserProfileAttributes;
// }

declare module "express-serve-static-core"{
  interface Request{
    user?: UserProfileAttributes
  }
}

export class UserAuthGuard {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (!token) {
        return next(new ExceptionHandler("Unauthorized Access", 401));
      }

      const verifiedToken = Helper.verifyToken(token);

      const user = await User.findOne({
        email: verifiedToken.token.email,
      });

      if (!user) {
        return next(new ExceptionHandler("Forbidden Access", HttpStatusCode.HTTP_FORBIDDEN));
      }

      req.user = user as unknown as UserProfileAttributes;
    } catch (error) {
      return next(error);
    }
  }
}
