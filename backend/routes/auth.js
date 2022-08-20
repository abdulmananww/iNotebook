const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "SECRETSTRING";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Create user - No login required
router.post(
  "/createUser",[
  body("name", "Enter value of minimum length 5").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),
  body("email_address").isEmail()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email_address: req.body.email_address });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email_address: req.body.email_address,
          password: secPass,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success: success,authtoken });
      } else {
        res.json({success:success,
          error: `User with this email (${req.body.email_address}) already exists`,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong in Auth");
    }
  }
);

// ROUTE 2: Login user
router.post(
  "/login",
  [body("password").exists(),
  body("email_address").isEmail()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email_address: req.body.email_address });
      if (!user) {
        return res.status(400).send({success: success,error:"Please login with correct credentials"});
      }
      let passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res.status(400).send({success: success,error:"Please login with correct credentials"});
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success:success, authtoken:  authtoken});
    } catch (err) {
      console.log(err);
      res.status(500).send({success: success,error:"Something went wrong in Auth"});
    }
  }
);
// ROUTE 3: Get user - Login required
router.get(
    "/getUser",
    fetchuser,
    async (req, res) => {
      try {
        userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong in Auth");
      }
    }
  );
module.exports = router;
