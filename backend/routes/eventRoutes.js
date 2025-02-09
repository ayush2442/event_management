// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../utils/authMiddleware");
// const {
//   createEvent,
//   getEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
//   joinEvent,
// } = require("../controllers/eventController");

// router.post("/", authMiddleware, createEvent);
// router.get("/", getEvents);
// router.get("/:id", getEventById);
// router.put("/:id", authMiddleware, updateEvent);
// router.delete("/:id", authMiddleware, deleteEvent);
// router.post("/:id/join", authMiddleware, joinEvent);

// module.exports = router;


const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const {
  createEvent,
  getEvents,
  getEventById,
  joinEvent
} = require("../controllers/eventController");

router.post("/", authMiddleware, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/join", authMiddleware, joinEvent);

module.exports = router;