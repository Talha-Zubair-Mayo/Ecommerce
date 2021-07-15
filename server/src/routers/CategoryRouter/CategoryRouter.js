const router = require("express").Router();
const CategoryCntrl = require("../../Controller/CategoryCntrl");
const authAdmin = require("../../middlewares/authAdmin");
const auth = require("../../middlewares/auth");

router
  .route("/category")
  .get(CategoryCntrl.getcategories)
  .post(auth, authAdmin, CategoryCntrl.addCategory);
// router.get("/category", CategoryCntrl.getcategories);

// router.post("/category", auth, authAdmin, CategoryCntrl.addCategory);

module.exports = router;
