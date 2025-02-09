// const express = require("express");
// const { register, login, guestLogin } = require("../controllers/authController");
// const authMiddleware = require("../utils/authMiddleware");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/guest-login", guestLogin);
// router.get("/filter", authMiddleware, getFilteredEvents);

// module.exports = router;

const express = require("express");
const { register, login, guestLogin } = require("../controllers/authController");
const { getFilteredEvents } = require("../controllers/eventController"); // ✅ Import it
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/guest-login", guestLogin);
router.get("/filter", authMiddleware, getFilteredEvents); // ✅ Ensure it's used properly

module.exports = router;

