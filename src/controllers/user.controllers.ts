import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import ExceptionHandler from "../utils/ExceptionHandler";
import Validator from "../helpers/Validator";
import SuccessResponse from "../utils/customResponse";
import Helper from "../helpers";
import logger from "../utils/logger";
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  UserSignInDto,
} from "../dtos/User";
import HttpStatusCode from "../helpers/HttpResponse";
const customResponseMessage = new SuccessResponse();

export class UserController {
  createUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = CreateUserProfileDto.validate(req.body);

      if (error) {
        logger.error(
          "Validation Error:",
          error.details.map((error) => error.message)
        );
      }

      const user = await User.create(value);
      console.log("User Profile: ", user)

      return customResponseMessage.sendSuccessResponse(
        res,
        user.toObject(),
        "User's Account Created",
        HttpStatusCode.HTTP_CREATED
      );
    } catch (error) {
      return next(error);
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = UserSignInDto.validate(req.body);
      console.log(value.email);

      if (error) {
        return next(
          Validator.RequestValidationError(
            error.details.map((error) => error.message)
          )
        );
      }

      const user = await User.findOne({ email: value.email }).select(
        "-createdAt -updateAt"
      );

      if (!user) {
        return next(
          new ExceptionHandler("User not found", HttpStatusCode.HTTP_NOT_FOUND)
        );
      }

      const isPasswordValid = Helper.correctPassword(
        value.password,
        user.password
      );

      if (!isPasswordValid) {
        return next(
          new ExceptionHandler(
            "Invalid credentials",
            HttpStatusCode.HTTP_BAD_REQUEST
          )
        );
      }

      const { token } = Helper.signToken({
        email: user?.email,
        _id: user?._id,
      });

      return customResponseMessage.sendSuccessResponse(
        res,
        {
          accessToken: token,
          user: Helper.omitProperties(user.toObject(), "password"),
        },
        "User Authenticated",
        HttpStatusCode.HTTP_OK
      );
    } catch (error) {
      return next(error);
    }
  };

  updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;

      const { error, value } = UpdateUserProfileDto.validate(req.body);

      if (error) {
        return next(
          Validator.RequestValidationError(
            error.details.map((error) => error.message)
          )
        );
      }

      const user = await User.findByIdAndUpdate(userId, value, { new: true });

      if (!user) {
        return next(
          new ExceptionHandler("User not found", HttpStatusCode.HTTP_NOT_FOUND)
        );
      }

      return customResponseMessage.sendSuccessResponse(
        res,
        user.toObject(),
        "User PRofile Updated Successfully",
        HttpStatusCode.HTTP_OK
      );
    } catch (error) {
      return next(error);
    }
  };

  listUserProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await User.find();

      if (users.length < 1) {
        return next(
          new ExceptionHandler(
            "No users Registered yet",
            HttpStatusCode.HTTP_NOT_FOUND
          )
        );
      }

      const cleanedUserProfiles = users.map((user) =>
        Helper.omitProperties(user.toObject(), "password")
      );

      return customResponseMessage.sendSuccessResponse(
        res,
        {
          "Number of Users": users.length,
          users: cleanedUserProfiles,
        },
        "Users profiles retrieved",
        HttpStatusCode.HTTP_OK
      );
    } catch (error) {
      return next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return next(
          new ExceptionHandler(
            "User's ID is required",
            HttpStatusCode.HTTP_BAD_REQUEST
          )
        );
      }
      const user = await User.findById(userId);

      if (!user) {
        return next(
          new ExceptionHandler(
            "User's Profile not found",
            HttpStatusCode.HTTP_NOT_FOUND
          )
        );
      }

      return customResponseMessage.sendSuccessResponse(
        res,
        {
          user: Helper.omitProperties(user.toObject(), "password"),
        },
        "User's profile retrieved",
        HttpStatusCode.HTTP_OK
      );
    } catch (error) {
      return next(error);
    }
  };

  deleteUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return next(
          new ExceptionHandler(
            "User's ID is required",
            HttpStatusCode.HTTP_BAD_REQUEST
          )
        );
      }

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return next(
          new ExceptionHandler(
            "User profile not found",
            HttpStatusCode.HTTP_NOT_FOUND
          )
        );
      }

      return customResponseMessage.sendSuccessResponse(
        res,
        null,
        "user's profile deleted successfully",
        HttpStatusCode.HTTP_OK
      );
    } catch (error) {
      return next(error);
    }
  };
}
