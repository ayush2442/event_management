// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import EventDetail from "./pages/EventDetail";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/events/:id" element={<EventDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/events/:id" 
            element={
              <ProtectedRoute>
                <EventDetail />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;