const router = require("express").Router();
const CategoryCntrl = require("../../Controller/CategoryCntrl");
const authAdmin = require("../../middlewares/authAdmin");
const auth = require("../../middlewares/auth");

router
  .route("/category")
  .get(CategoryCntrl.getcategories)
    .post(auth, authAdmin, CategoryCntrl.addCategory);

  router
    .route("/category/:id")
    .delete(auth, authAdmin, CategoryCntrl.deleteCategory)
    .put(auth, authAdmin, CategoryCntrl.updateCategory);


module.exports = router;
