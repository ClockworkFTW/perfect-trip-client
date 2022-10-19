import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TripList from "./pages/TripList";
import TripView from "./pages/TripView";
import TripEditor from "./pages/TripEditor";
import ExperienceList from "./pages/ExperienceList";
import ExperienceView from "./pages/ExperienceView";
import ExperienceEditor from "./pages/ExperienceEditor";
import Profile from "./pages/Profile";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="trip">
        <Route index element={<TripList />} />
        <Route path=":tripId" element={<TripView />} />
        <Route path=":edit/:tripId" element={<TripEditor />} />
      </Route>
      <Route path="experience">
        <Route index element={<ExperienceList />} />
        <Route path=":experienceId" element={<ExperienceView />} />
        <Route path=":edit/:experienceId" element={<ExperienceEditor />} />
      </Route>
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
