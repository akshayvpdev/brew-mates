const Profile = require("../Model/Profile");
const User = require("../Model/User");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

// get current user profile
module.exports.getUserProfile = CatchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No user ID", 400));

  const data = await Profile.findById(req.params.id).populate([
    { path: "requested_ids" },
    { path: "accepted_ids" },
  ]);

  if (!data) return next(new AppError("No user found", 404));
  res.status(200).json({
    data,
    message: "success",
  });
});

// update current user profile
module.exports.updateProfile = CatchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No user ID", 400));

  const profile = await Profile.findById(req.params.id);
  if (!profile) return next(new AppError("No user found", 404));

  if (profile) {
    const requestedIds = profile.requested_ids;
    const acceptedIds = profile.accepted_ids;

    if (req.body.accepted_id) {
      const acceptedId = req.body.accepted_id;
      const indexInRequested = requestedIds.indexOf(acceptedId);

      if (indexInRequested !== -1) {
        // Remove from requested_ids array
        requestedIds.splice(indexInRequested, 1);
        // Add to accepted_ids array
        acceptedIds.push(acceptedId);
      }
    }

    if (req.body.requested_id) {
      const requestedId = req.body.requested_id;

      // Check if the requested_id is already in the requested_ids array
      if (!requestedIds.includes(requestedId)) {
        // Add to requested_ids array
        requestedIds.push(requestedId);
      }
    }
    if (
      req.body.name ||
      req.body.email ||
      req.body.interest ||
      req.body.sexual_orientation ||
      req.body.phone_number ||
      req.body.gender ||
      req.body.images
    ) {
      profile.name = req.body.name;
      profile.email = req.body.email;
      profile.interest = req.body.interest;
      profile.sexual_orientation = req.body.sexual_orientation;
      profile.phone_number = req.body.phone_number;
      profile.gender = req.body.gender;
      profile.images = req.body.images;
    }

    // Save the updated profile
    await profile.save();
  }
  res.status(200).json({
    message: "updated",
  });
});

// controller for update user current location
module.exports.updateProfileLocation = CatchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No user ID", 400));

  const profile = await Profile.findById(req.params.id);
  if (!profile) return next(new AppError("No user found", 404));

  profile.location.coordinates = req.body.coordinates;
  await profile.save();

  res.status(200).json({
    message: "updated",
  });
});

// controller to find user with same interest
module.exports.similarInterestPeople = CatchAsync(async (req, res, next) => {
  const allUsers = await Profile.find({
    _id: { $ne: req.user._id },
    sexual_orientation: req.user?.sexual_orientation,
    gender: { $ne: req.user?.gender },
  });
  const similarUsers = allUsers.filter((user) => {
    if (req.user.profile_id !== user._id) {
      // Calculate the number of shared interests between the current user and the target user
      const sharedInterests = user.interest.filter((interest) =>
        req.user.interest.includes(interest)
      );
      // You can set a threshold for the number of shared interests to define similarity
      const similarityThreshold = 2; // Example: At least 2 shared interests
      return sharedInterests.length >= similarityThreshold;
    }
    res.status(200).json({ message: "no people with similar interest" });
  });

  res.status(200).json({
    data: similarUsers,
    message: "success",
  });
});

// controller to get near users
module.exports.getUsersNear = CatchAsync(async (req, res, next) => {
  const currentUser = await Profile.findById(req.user._id);
  const users = await Profile.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: currentUser?.location?.coordinates,
        },
        $maxDistance: 10000,
      },
    },
    _id: { $ne: currentUser._id },
  });

  if (!users || users.length === 0) {
    res.status(200).json({
      message: "No user found near 10 km",
    });
  }
  res.status(200).json({
    users,
    message: "success",
  });
});
