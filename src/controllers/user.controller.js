import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, name, message } = req.body;

  const allFilds = [fullname, message, email, name].some(
    (fild) => fild?.trim() === "",
  );

  if (allFilds) {
    throw new apiError(400, "All Filds are Required");
  }

  if (!email.includes(".com")) {
    throw new apiError(400, "Email must be correct");
  }

  const check = await User.findOne({ $or: [{ email }, { name }] });

  if (check) {
    throw new apiError(409, "User already Exist");
  }

  const user = await User.create({
    fullname,
    email,
    message,
    name,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new apiError(500, "Something went wrong registering a user");
  }

  return res
    .status(200)
    .json(new apiResponse(200, createdUser, "User created sucessfully"));
});

export { registerUser };
