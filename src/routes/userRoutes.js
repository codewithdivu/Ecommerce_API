import express from "express";
import {
  deleteUser,
  getAllUser,
  getUserByID,
  updateProfile,
  uploadProfilePic,
} from "../controllers/userController.js";
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware.js";
import multer from "multer";

const UserRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

UserRouter.route("/").get(isAuthenticatedMiddleware, getAllUser);
UserRouter.route("/:id")
  .get(isAuthenticatedMiddleware, getUserByID)
  .delete(isAuthenticatedMiddleware, deleteUser);

UserRouter.route("/:id/updateProfile").patch(
  isAuthenticatedMiddleware,
  updateProfile
);
UserRouter.route("/profilePic").post(
  upload.single("profilePic"),
  uploadProfilePic
);

export default UserRouter;
