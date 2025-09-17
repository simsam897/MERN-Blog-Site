import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // directory already exists, no need to check
    cb(null, "../public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

export const upload = multer({ storage });
