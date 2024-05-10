"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
class UserRouter {
    constructor() {
        this.userController = new user_controllers_1.UserController();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .post("/auth/create-user-profile/", this.userController.createUsers)
            .post("/auth/signIn/", this.userController.userLogin)
            .get("/list-users-profiles/", this.userController.listUserProfiles)
            .get("/:id", this.userController.getUserById)
            .put("/:id", this.userController.updateUserProfile)
            .delete("/:id", this.userController.deleteUserProfile);
    }
}
exports.default = new UserRouter();
