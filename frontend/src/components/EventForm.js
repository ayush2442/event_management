const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    category: "",
    location: "",
    maxAttendees: "",
    isPrivate: false,
    ticketPrice: "0",
  });

  const categories = [
    "Conference",
    "Workshop",
    "Meetup",
    "Social",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(formData);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4">
      <input
        type="text"
        placeholder="Event Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Attendees"
        value={formData.maxAttendees}
        onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isPrivate}
          onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
          className="mr-2"
        />
        <label>Private Event</label>
      </div>
      <input
        type="number"
        placeholder="Ticket Price"
        value={formData.ticketPrice}
        onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Event
      </button>
    </form>
  );
};