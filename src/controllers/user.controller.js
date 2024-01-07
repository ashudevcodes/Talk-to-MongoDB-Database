import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uplodeFile } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, username } = req.body;

  const allFilds = [fullname, email, password, username].some(
    (fild) => fild?.trim() === "",
  );

  if (allFilds) {
    throw new apiError(400, "All Filds are Required");
  }

  if (!email.includes("@gmail.com")) {
    throw new apiError(400, "Email must be an gmail account");
  }

  const check = await User.findOne({ $or: [{ email }, { username }] });

  if (check) {
    throw new apiError(409, "User already Exist");
  }

  const avatarLocalPath = await req.files?.avatar[0]?.path;
  console.log(req.files);
  console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar file path not visable");
  }

  const avatar = await uplodeFile(avatarLocalPath);
  console.log(avatar);

  //console.log(req.files);
  if (!avatar) {
    throw new apiError(400, "avatar is Required");
  }

  const user = await User.create({
    fullname,
    email,
    avatar: avatar.url,
    password,
    username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong registering a user");
  }

  return res
    .status(200)
    .json(new apiResponse(200, createdUser, "User created sucessfully"));
});

export { registerUser };
