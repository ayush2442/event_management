const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
    status: 'upcoming' // or 'past'
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await getEvents(filters);
      setEvents(data);
    };
    fetchEvents();
  }, [filters]);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    if (filters.status === 'upcoming' && eventDate < now) return false;
    if (filters.status === 'past' && eventDate >= now) return false;
    
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events Dashboard</h1>
      
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          className="p-2 border rounded"
        />
        
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="p-2 border rounded"
        />
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="upcoming">Upcoming Events</option>
          <option value="past">Past Events</option>
        </select>
      </div>

      <EventForm />
      <EventList events={filteredEvents} />
    </div>
  );
};