import multer from "multer";

const upload = multer({ dest: "./assets/uploadedFiles" });

export const localUploadProcessByMulter = upload.array("file");
export const localUploadResponse = (req, res) => {
  let paths = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      paths = paths.concat(req.files[i].path);
    }
    res.json({ paths });
    console.log(paths);
  }
};
