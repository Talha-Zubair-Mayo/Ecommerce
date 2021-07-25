const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(422).json({ error: "Invalid Authentication " });
    } else {
      jwt.verify(token, process.env.AccessTokenKey, (err, user) => {
        if (err) {
          res.status(422).json({ error: "Invalid Authentication " });
        } else {
          req.user = user;

          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

module.exports = auth;
