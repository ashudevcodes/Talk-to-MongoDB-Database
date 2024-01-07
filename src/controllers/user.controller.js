import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uplodeFile } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, username } = req.body;
  console.log(typeof fullname);
  console.log(typeof email);
  console.log(typeof password);
  console.log(typeof username);

  const allFilds = [fullname, email, password, username].some(
    (fild) => fild?.trim() === "",
  );

  console.log("Fild check error");

  if (allFilds) {
    throw new apiError(400, "All find are Required");
  }

  console.log("find check coplete");

  if (!email.includes("@gmail.com")) {
    throw new apiError(400, "Email must be an gmail Accoount");
  }

  const check = await User.findOne({ $or: [{ email }, { username }] });

  if (check) {
    throw new apiError(409, "User already Exist");
  }

  /* console.log(req.files);
  const avatarLocalPath = await req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);
  const coverImagePath = await req.files?.coverImage[0]?.path;

  console.log(coverImagePath);

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar file is Required");
  }

  const avatar = await uplodeFile(avatarLocalPath);
  const coverimg = await uplodeFile(coverImagePath);

  if (!avatar) {
    throw new apiError(400, "avatar is Required");
  }
*/
  const user = await User.create({
    fullname,
    email,
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
