const express = require("express");
const authController = require("../Controller/authController");

const router = express.Router();

// signup user
router.post("/signup", authController.signup);

// login user
router.post("/login", authController.login);

// logout user
router.get("/logout", authController.logout);

// reset the password if user forgot
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token?", authController.resetPassword);

// api to update access token
router.post("/refreshToken", authController.refreshToken);

// update user password
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
