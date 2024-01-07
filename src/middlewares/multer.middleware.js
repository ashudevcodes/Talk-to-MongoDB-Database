import multer from "multer";

const storage = multer.diskStorage({
  diskStorage: function (req, file, cd) {
    cd(null, "/tmp/");
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname);
  },
});

export const uplode = multer({ storage });
