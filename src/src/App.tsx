import { Routes, Route } from "react-router-dom";
import EventsView from "./Pages/EventsView";
import EventChallengesView from "./Pages/EventChallengesView";
import ChallengeView from "./Pages/ChallengeView";
import Header from  "./Pages/Components/Header";
import PlayGround from "./Pages/PlayGround";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import 
// import UserView from './Pages/UserView';
// import AdminView from './Pages/AdminView';
// import RankingView from './Pages/RankingView';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<EventsView />} />
        <Route path="/event/:eventId" element={<EventChallengesView />} />
        <Route path="/e" element={<EventChallengesView />} />
        <Route
          path="/event/:eventId/challenge/:challengeId"
          element={<ChallengeView />}
        />
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/user" element={<UserView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/ranking" element={<RankingView />} /> */}
      </Routes>
    </>
  );
}

export default App;
