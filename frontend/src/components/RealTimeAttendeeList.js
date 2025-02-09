const RealTimeAttendeeList = ({ eventId }) => {
    const [attendees, setAttendees] = useState([]);
    const [ws, setWs] = useState(null);
  
    useEffect(() => {
      // Initial fetch
      fetchAttendees();
      
      // Setup WebSocket
      const wsClient = new WebSocket(`${process.env.REACT_APP_WS_URL}/events/${eventId}`);
      
      wsClient.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'ATTENDEES_UPDATE') {
          setAttendees(data.attendees);
        }
      };
      
      setWs(wsClient);
      
      return () => {
        if (wsClient) {
          wsClient.close();
        }
      };
    }, [eventId]);
  
    const fetchAttendees = async () => {
      const { data } = await getEventById(eventId);
      setAttendees(data.attendees);
    };
  
    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Attendees ({attendees.length})</h3>
        <ul className="mt-2 space-y-2">
          {attendees.map((attendee) => (
            <li 
              key={attendee._id}
              className="p-2 bg-gray-50 rounded flex justify-between items-center"
            >
              <span>{attendee.name}</span>
              {attendee.isOrganizer && (
                <span className="text-sm text-gray-500">(Organizer)</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };