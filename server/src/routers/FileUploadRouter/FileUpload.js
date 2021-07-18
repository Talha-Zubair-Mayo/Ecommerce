const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const auth = require("../../middlewares/auth");
const authAdmin = require("../../middlewares/authAdmin");

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});
// Upload Image
router.post("/upload", auth, authAdmin, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(422).json({ msg: "No Files Were uploaded..." });
    }
    const file = req.files.file;
    if (file.size > 4048576) {
      removeTmp(file.tempFilePath);
      res.status(422).json({ msg: "File Size Must Be Less Than 4MB..." });
    }
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);

      res.status(422).json({ msg: "invalid File Format..." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      (err, result) => {
        if (err) {
          res.status(422).json({ msg: "Failed to file upload..." });
        } else {
          removeTmp(file.tempFilePath);

          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post("/destroy", auth, authAdmin, async (req, res) => {
  const { public_id } = req.body;
  try {
    if (!public_id) {
      res.status(422).json({ msg: "No File Selected..." });
    }
    await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) throw err;
      res.status(200).json({ msg: "Photo Deleted....." });
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
