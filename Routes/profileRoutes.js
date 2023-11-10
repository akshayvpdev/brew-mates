const express = require("express");
const router = express.Router();

const authController = require("../Controller/authController");
const profileController = require("../Controller/profileController");

//get users with similar interest
router.get(
  "/sameInterestPeople",
  authController.protect,
  profileController.similarInterestPeople
);

// auto update user location
router.patch("/updateLocation/:id?", profileController.updateProfileLocation);

//get user near
router.get("/nearMe", authController.protect, profileController.getUsersNear);

//update user profile

router.patch("/updateUser/:id?", profileController.updateProfile);

//get user profile
router.get("/:id?", profileController.getUserProfile);

module.exports = router;
