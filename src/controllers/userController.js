import multer from "multer";
import User from "../models/User.js";
import { storage } from "../firebase/config.js";
// import serviceAccount from "../../service.json" assert { type: "json" };

// get all users
const getAllUser = async (req, res) => {
  const users = await User.find();
  const userCounts = await User.countDocuments();

  res.status(200).json({
    success: true,
    msg: "User get Successfully!",
    count: userCounts,
    data: users,
  });
};

// get user by id
const getUserByID = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }
  res
    .status(200)
    .json({ success: true, data: user, msg: "successfully request" });
};

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      msg: "user is not found",
    });
  }

  res.status(200).json({
    success: true,
    msg: "User successfully Deleted...",
  });
};

// update profile
const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const updatedProfile = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, data: user, msg: "Successfully updated" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// upload profile pic
const uploadProfilePic = async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      msg: "Provide a file, please",
    });
    return;
  }

  const uniqueId = Date.now().toString();
  const storagePath = `profile-pics/${uniqueId}_${req.file.originalname}`;

  const fileUpload = storage.file(storagePath);
  const blobStream = fileUpload.createWriteStream();

  blobStream.on("error", (error) => {
    console.error("Error uploading file:", error);
    res.status(500).json({
      success: false,
      msg: "Error uploading file",
    });
  });

  blobStream.on("finish", async () => {
    try {
      // Generate a signed URL for the file
      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: Date.now() + 2 * 365 * 24 * 60 * 60 * 1000,
      });
      res.json({
        success: true,
        data: url,
        msg: "Profile pic successfully uploaded.",
      });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).json({
        success: false,
        msg: "Error generating signed URL",
      });
    }
  });

  blobStream.end(req.file.buffer);
};

export { getAllUser, getUserByID, deleteUser, updateProfile, uploadProfilePic };
