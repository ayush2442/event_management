import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/api";
import RealTimeAttendeeList from "../components/RealTimeAttendeeList";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await getEventById(id);
      setEvent(data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-700 mb-4">{event.description}</p>
          <p className="text-gray-600 mb-4">
            Date: {new Date(event.date).toLocaleString()}
          </p>
          {event.location && (
            <p className="text-gray-600 mb-4">Location: {event.location}</p>
          )}
          {event.category && (
            <p className="text-gray-600 mb-4">Category: {event.category}</p>
          )}
          {event.ticketPrice && (
            <p className="text-gray-600 mb-4">
              Price: ${parseFloat(event.ticketPrice).toFixed(2)}
            </p>
          )}
          
          {/* Add the real-time attendee list component */}
          <div className="mt-8">
            <RealTimeAttendeeList eventId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;