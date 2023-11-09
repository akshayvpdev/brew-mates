const express = require("express");
const router = express.Router();

const authController = require("../Controller/authController");
const profileController = require("../Controller/profileController");

//get and update user profile
router
  .get("/", profileController.getUserProfile)
  .patch(profileController.updateProfile);

// auto update user location
router.patch("/updateLocation", profileController.updateProfileLocation);

//get users with similar interest
router.get(
  "/sameInterestPeople",
  authController.protect,
  profileController.similarInterestPeople
);

//get user near
router.get("/nearMe", authController.protect, profileController.getUsersNear);

module.exports = router;
