const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserCntrl = {
  register: async (req, res) => {
    const { name, email, pass } = req.body;

    try {
      //Checking Existing Email
      const emailexist = await User.findOne({ email: email });
      // Checking All Feilds Available
      if (!name || !email || !pass) {
        res.status(422).json({ msg: "Please Fill All Feilds" });
      } else if (emailexist) {
        return res.status(422).json({ msg: "Email Already Exist" });
      }
      // Password length
      if (pass.length < 6) {
        return res
          .status(422)
          .json({ msg: "Password Must Be Greater Than 6 " });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(pass, 12);
      const newUser = new User({
        name,
        email: email,
        pass: passwordHash,
      });

      // save to mongoDB
      const regUser = await newUser.save();
      console.log(regUser);

      // Create JsonWebToken to AuthenTication
      const AccessToken = CreateAccessToken({ _id: newUser._id });
      const RefreshToken = CreateRefreshToken({ _id: newUser._id });
      res.cookie("RefreshTokencookie", RefreshToken, {
        httpOnly: true,
        path: "user/RefreshToken",
      });
      //   res.send(AccessToken);
      res.status(200).json({ msg: "User Registered Successfully" });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  refreshtoken: async (req, res) => {
    const rf_token = req.cookies.RefreshTokencookie;
    try {
      if (!rf_token) {
        res.status(422).json({ msg: "Please Login or register " });
      } else {
        jwt.verify(rf_token, process.env.ReFreshTokenKey, (err, user) => {
          if (err) res.status(422).json({ msg: "Please Login or register " });
          const accesstoken = CreateAccessToken({ _id: user._id });
          res.status(200).json({ user, accesstoken, rf_token });
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // login
  login: async (req, res) => {
    const { email, pass } = req.body;
    try {
      const emaill = email.toLowerCase();
      //Checking Existing User
      const user = await User.findOne({ email: emaill });
      // Checking All Feilds Available
      if (!email || !pass) {
        return res.status(422).json({ msg: "Please Fill All Feilds" });
      } else if (!user) {
        return res
          .status(422)
          .json({ msg: " User Does'nt Exist", status: 422 });
      }
      // Comparing Password
      const isMatch = await bcrypt.compare(pass, user.pass);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect email or password." });
      }
      // Create Cookie After Logged in
      const AccessToken = CreateAccessToken({ _id: user._id });
      const RefreshToken = CreateRefreshToken({ _id: user._id });

      res.cookie("RefreshTokencookie", RefreshToken, {
        httpOnly: true,
        path: "user/RefreshToken",
      });
      res.status(200).json({ msg: "Logged in...." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("RefreshTokencookie", { path: "user/RefreshToken" });
      res.status(200).json({ msg: "Logged out Successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-pass");

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      console.log(req.user._id);
      const cart = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const CreateAccessToken = (user) => {
  return jwt.sign(user, process.env.AccessTokenKey, {
    expiresIn: "1d",
  });
};

const CreateRefreshToken = (user) => {
  return jwt.sign(user, process.env.ReFreshTokenKey, {
    expiresIn: "7d",
  });
};

module.exports = UserCntrl;
