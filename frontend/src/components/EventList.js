import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          <h2>
            <Link to={`/events/${event._id}`}>{event.name}</Link>
          </h2>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;