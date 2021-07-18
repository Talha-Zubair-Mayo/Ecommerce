require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieparser = require("cookie-parser");
require("./DB/DBConnection");

// Router imports

const UserRoutes = require("./routers/UserRoute/UserRouter");
const CategoryRoutes = require("./routers/CategoryRouter/CategoryRouter");
const filesUpload = require("./routers/FileUploadRouter/FileUpload");
const ProductRoutes = require("./routers/ProductRouter/ProductRouter");

//PORT
const PORT = process.env.PORT || 5000;
//Middlewares

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routers
app.use("/api/", UserRoutes);
app.use("/api/", CategoryRoutes);
app.use("/api/", filesUpload);
app.use("/api/", ProductRoutes);

app.get("/app", (req, res) => {
  res.status(200).json({ msg: "Hello Server is working Fine" });
});

app.listen(PORT, () => {
  console.log(`Server is Running On Port ${PORT}`);
});
