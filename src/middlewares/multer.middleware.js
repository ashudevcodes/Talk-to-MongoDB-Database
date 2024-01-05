import multer from "multer";

const storage = multer.diskStorage({
  diskStorage: function (req, file, cd) {
    cd(null, "./public/temp");
  },
  filename: function (req, file, cd) {
    cd(null, file.filename);
  },
});

export const uplode = multer({ storage: storage });
