import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Components
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TripEditor from "./pages/TripEditor";
import ExperienceView from "./pages/ExperienceView";
import ExperienceEditor from "./pages/ExperienceEditor";
import Profile from "./pages/Profile";

// Context
export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = jwtDecode(token);
      setUser({ ...payload, token });
    }

    setIsInitialized(true);
  }, []);

  return isInitialized ? (
    <UserContext.Provider value={[user, setUser]}>
      <Router />
    </UserContext.Provider>
  ) : null;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="trip">
        <Route path=":edit/:tripId" element={<TripEditor />} />
      </Route>
      <Route path="experience">
        <Route path=":experienceId" element={<ExperienceView />} />
        <Route path=":edit/:experienceId" element={<ExperienceEditor />} />
      </Route>
      <Route path="profile/:userId" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
