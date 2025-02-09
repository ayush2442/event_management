const Event = require("../models/Event");

const createEvent = async (req, res) => {
  const { name, description, date, category, location, maxAttendees, isPrivate, ticketPrice } = req.body;
  try {
    const event = new Event({
      name,
      description,
      date,
      category,
      location,
      maxAttendees,
      isPrivate,
      ticketPrice,
      createdBy: req.user.id
    });
    await event.save();

    // Emit real-time update
    req.app.get('io').emit('eventCreated', event);
    
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const { category, startDate, endDate, status } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (status === 'upcoming') {
      query.date = { $gte: new Date() };
    } else if (status === 'past') {
      query.date = { $lt: new Date() };
    }

    const events = await Event.find(query)
      .populate("createdBy", "name")
      .populate("attendees", "name")
      .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("attendees", "name");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is already in attendees
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: "Already joined this event" });
    }

    event.attendees.push(req.user.id);
    await event.save();

    // Emit real-time update
    req.app.get('wsManager').emitAttendeeUpdate(req.params.id, event.attendees);

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilteredEvents = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    let query = {};

    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEvent, getEvents, getEventById, joinEvent, getFilteredEvents };
