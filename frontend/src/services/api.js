import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
export const createEvent = (eventData) => API.post("/events", eventData);
export const getEvents = () => API.get("/events");
export const getEventById = (id) => API.get(`/events/${id}`);
export const updateEvent = (id, eventData) => API.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const joinEvent = (id) => API.post(`/events/${id}/join`);