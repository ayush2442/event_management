import React, { useEffect, useState } from "react";
import { getEventById } from "../api";

const AttendeeList = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      const { data } = await getEventById(eventId);
      setAttendees(data.attendees);
    };
    fetchAttendees();
  }, [eventId]);

  return (
    <div>
      <h3>Attendees</h3>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee._id}>{attendee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;