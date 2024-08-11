import {Routes, Route} from 'react-router-dom'
import EventsView from './Pages/EventsView';
import EventChallengesView from './Pages/EventChallengesView';
import ChallengeView from './Pages/ChallengeView';
// import UserView from './Pages/UserView';
// import AdminView from './Pages/AdminView';
// import RankingView from './Pages/RankingView';


function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<EventsView />} />
        <Route path="/event/:eventId" element={<EventChallengesView />} />
        <Route path="/event/:eventId/challenge/:challengeId" element={<ChallengeView />} />
        {/* <Route path="/user" element={<UserView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/ranking" element={<RankingView />} /> */}
      </Routes>
      
    </>
  )
}

export default App;
