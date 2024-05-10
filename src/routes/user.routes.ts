import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

class UserRouter {
  private userController = new UserController();
  readonly router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .post("/auth/create-user-profile/", this.userController.createUsers)
      .post("/auth/signIn/", this.userController.userLogin)

      .get("/list-users-profiles/", this.userController.listUserProfiles)

      .get("/:id", this.userController.getUserById)

      .put("/:id", this.userController.updateUserProfile)

      .delete("/:id", this.userController.deleteUserProfile);
  }
}

export default new UserRouter();
