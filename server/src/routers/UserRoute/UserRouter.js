const router = require("express").Router();
const UserCntrl = require("../../Controller/UserCntrl");

//auth
const auth = require("../../middlewares/auth");

router.post("/register", UserCntrl.register);
router.get("/refreshtoken", UserCntrl.refreshtoken);
router.post("/login", UserCntrl.login);
router.get("/logout", UserCntrl.logout);
router.get("/userInfo", auth, UserCntrl.getUser);
router.put("/addcart", auth, UserCntrl.addCart);

module.exports = router;
