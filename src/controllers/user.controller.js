import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uplodeFile } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const ganerateAccessAndRefreshTokan = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesTokan = await user.ganerateAccessTokn();
    const refreshTokan = await user.ganeraterefreshToken();

    user.refreshToken = refreshTokan;
    await user.save({ validateBeforeSave: false });
    return { accesTokan, refreshTokan };
  } catch (error) {
    throw new apiError(
      500,
      "Someting whent wrong while generatiing refresh and access tokan",
    );
  }
};

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
  // console.log(req.files);
  // console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar file path not visable");
  }

  const avatar = await uplodeFile(avatarLocalPath);
  // console.log(avatar);

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

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  if (!username && !email) {
    throw new apiError(400, "username or Email is Required");
  }

  const findUser = await User.findOne({ $or: [{ username }, { email }] });

  if (!findUser) {
    throw new apiError(404, "User not Exist");
  }

  const isPasswordValidate = await findUser.isPasswordCorrect(password);

  if (!isPasswordValidate) {
    throw new apiError(401, "password incorrect");
  }

  const { accesTokan, refreshTokan } = await ganerateAccessAndRefreshTokan(
    user._id,
  );

  const loginuser = await User.findById(user._id).select(
    "-password -refreshTokan",
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessTokan", accesTokan, option)
    .cookie("refreshTokan", refreshTokan, option)
    .json(
      new apiResponse(
        200,
        {
          user: loginUser,
          accesTokan,
          refreshTokan,
        },
        "user login sucessfully",
      ),
    );
});

const logOutUser = asyncHandler(async (req, res) => {});
export { registerUser, loginUser };
