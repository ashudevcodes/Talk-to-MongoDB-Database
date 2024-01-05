import { v2 as cloudinary } from "cloudinary";
import exp from "constants";
import fs, { read } from "fs";
import { resolve } from "path";
import { log } from "util";

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_CLOUD_NAME,
  api_key: process.env.CLAUDINARY_API_KEY,
  api_secret: process.env.CLAUDINARY_API_SEC,
});

const uplodeFile = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    const result = await cloudinary.uploader.upload(localfilepath, {
      resourse_type: "auto",
    });
    console.log("File is Uploded on cloudinary", result);
    return result;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export { uplodeFile };
