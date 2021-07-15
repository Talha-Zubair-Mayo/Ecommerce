const Users = require("../Models/UserModel");
const authAdmin = async (req, res, next) => {
  try {

    const userss = await Users.findOne({_id:req.user._id});
    if (userss.role === 0) {
      res.status(422).json({ error: "Access Denied" });
    }
      next();
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

module.exports = authAdmin;
