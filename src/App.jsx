import Boards from './pages/Boards'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomDetails from './pages/RoomDetails/RoomDetails';
function App() {
  return (
    <Router>
      <Routes>
        {/* Trang Chính */}
        <Route path="/" element={<Boards />} />
        <Route path="/room/:id" element={<RoomDetails />} />
      </Routes>
    </Router>
    
  )
}

export default App
